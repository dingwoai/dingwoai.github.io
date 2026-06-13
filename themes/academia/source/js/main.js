$(function () {
    // ============================================
    // 基础交互
    // ============================================

    // resize window
    $(window).resize(function () {
        if ($(window).width() < 1280 && $(window).width() > 540) {
            $(".page").css({ "width": $(window).width() - $(".side-card").width() - 90, "float": "left" })
        } else {
            $(".page").removeAttr("style")
        }
    });

    // menu
    $(".menus_icon").click(function () {
        if ($(".header_wrap").hasClass("menus-open")) {
            $(".header_wrap").removeClass("menus-open").addClass("menus-close")
        } else {
            $(".header_wrap").removeClass("menus-close").addClass("menus-open")
        }
    })

    $(".m-social-links").click(function () {
        if ($(".author-links").hasClass("is-open")) {
            $(".author-links").removeClass("is-open").addClass("is-close")
        } else {
            $(".author-links").removeClass("is-close").addClass("is-open")
        }
    })

    $(".site-nav").click(function () {
        if ($(".nav").hasClass("nav-open")) {
            $(".nav").removeClass("nav-open").addClass("nav-close")
        } else {
            $(".nav").removeClass("nav-close").addClass("nav-open")
        }
    })

    $(document).click(function (e) {
        var target = $(e.target);
        if (target.closest(".nav").length != 0) return;
        $(".nav").removeClass("nav-open").addClass("nav-close")
        if (target.closest(".author-links").length != 0) return;
        $(".author-links").removeClass("is-open").addClass("is-close")
        if ((target.closest(".menus_icon").length != 0) || (target.closest(".menus_items").length != 0)) return;
        $(".header_wrap").removeClass("menus-open").addClass("menus-close")
    })

    // 显示 cdtop
    $(document).ready(function ($) {
        var offset = 100,
            scroll_top_duration = 700,
            $back_to_top = $('.nav-wrap');

        $(window).scroll(function () {
            ($(this).scrollTop() > offset) ? $back_to_top.addClass('is-visible') : $back_to_top.removeClass('is-visible');
        });

        $(".cd-top").on('click', function (event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration);
        });
    });

    // pjax
    $(document).pjax('a[target!=_blank]', '.page', {
        fragment: '.page',
        timeout: 5000
    });
    $(document).on({
        'pjax:click': function () {
            $('body,html').animate({
                scrollTop: 0,
            }, 700);
        },
        'pjax:end': function () {
            if ($(".header_wrap").hasClass("menus-open")) {
                $(".header_wrap").removeClass("menus-open").addClass("menus-close")
            }
            if ($(".author-links").hasClass("is-open")) {
                $(".author-links").removeClass("is-open").addClass("is-close")
            }
            if ($(".nav").hasClass("nav-open")) {
                $(".nav").removeClass("nav-open").addClass("nav-close")
            }
            // PJAX 后重新初始化动画
            initAOS();
            initSkillBars();
        }
    });

    // smooth scroll
    $(function () {
        $('a[href*=\\#]:not([href=\\#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 700);
                    return false;
                }
            }
        });
    });

    // ============================================
    // 新增特效 - 打字机效果
    // ============================================
    function initTypingEffect() {
        var $bio = $('.author-bio');
        if ($bio.length === 0) return;

        var originalText = $bio.text().trim();
        $bio.data('original-text', originalText);
        $bio.text('');

        var charIndex = 0;
        var typingSpeed = 60;

        function typeChar() {
            if (charIndex < originalText.length) {
                $bio.text(originalText.substring(0, charIndex + 1));
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            } else {
                // 打字完成后添加闪烁光标
                $bio.append('<span class="typed-cursor"></span>');
            }
        }

        // 延迟 0.5s 开始打字
        setTimeout(typeChar, 500);
    }

    // ============================================
    // 新增特效 - AOS 滚动动画初始化
    // ============================================
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            // 为文章内容添加 AOS 属性
            $('.page article h2').each(function (index) {
                if (!$(this).attr('data-aos')) {
                    $(this).attr('data-aos', 'fade-up');
                    $(this).attr('data-aos-delay', (index * 100).toString());
                    $(this).attr('data-aos-duration', '600');
                }
            });

            $('.page article h3').each(function (index) {
                if (!$(this).attr('data-aos')) {
                    $(this).attr('data-aos', 'fade-right');
                    $(this).attr('data-aos-delay', (index * 80).toString());
                    $(this).attr('data-aos-duration', '500');
                }
            });

            $('.page article p').each(function (index) {
                if (!$(this).attr('data-aos')) {
                    $(this).attr('data-aos', 'fade-up');
                    $(this).attr('data-aos-delay', (index * 50).toString());
                    $(this).attr('data-aos-duration', '500');
                }
            });

            $('.page article ul').each(function (index) {
                if (!$(this).attr('data-aos')) {
                    $(this).attr('data-aos', 'fade-up');
                    $(this).attr('data-aos-delay', (index * 80).toString());
                    $(this).attr('data-aos-duration', '600');
                }
            });

            $('.page article img').each(function () {
                if (!$(this).attr('data-aos')) {
                    $(this).attr('data-aos', 'zoom-in');
                    $(this).attr('data-aos-duration', '600');
                }
            });

            AOS.init({
                once: true,
                offset: 50,
                easing: 'ease-out-cubic'
            });
        }
    }

    // ============================================
    // 新增特效 - 技能进度条动画
    // ============================================
    function initSkillBars() {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var $fills = $(entry.target).find('.skill-fill');
                    $fills.each(function () {
                        var width = $(this).data('width');
                        $(this).css('width', width + '%');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        $('.skill-bars').each(function () {
            observer.observe(this);
        });
    }

    // ============================================
    // 新增特效 - 浮动粒子背景
    // ============================================
    function initParticles() {
        if ($('.particles-bg').length > 0) return; // 避免重复创建

        var $particlesContainer = $('<div class="particles-bg"></div>');
        $('body').prepend($particlesContainer);

        var colors = ['#667eea', '#764ba2', '#2b6cb0', '#4c51bf', '#319795'];

        for (var i = 0; i < 15; i++) {
            var size = Math.random() * 6 + 3;
            var left = Math.random() * 100;
            var duration = Math.random() * 20 + 15;
            var delay = Math.random() * 20;
            var color = colors[Math.floor(Math.random() * colors.length)];

            var $particle = $('<div class="particle"></div>');
            $particle.css({
                'width': size + 'px',
                'height': size + 'px',
                'left': left + '%',
                'background': color,
                'animation-duration': duration + 's',
                'animation-delay': delay + 's'
            });
            $particlesContainer.append($particle);
        }
    }

    // ============================================
    // 新增特效 - Header 滚动效果
    // ============================================
    function initHeaderScroll() {
        var lastScrollTop = 0;
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var $header = $('#page_header');

            if (scrollTop > 50) {
                $header.css({
                    'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.08)'
                });
            } else {
                $header.css({
                    'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.04)'
                });
            }

            lastScrollTop = scrollTop;
        });
    }

    // ============================================
    // 新增特效 - 侧边栏入场动画
    // ============================================
    function initSidebarAnimation() {
        var $sideCard = $('.side-card');
        $sideCard.css({
            'opacity': '0',
            'transform': 'translateX(-30px)'
        });

        setTimeout(function () {
            $sideCard.animate({
                opacity: 1
            }, {
                duration: 600,
                easing: 'swing',
                step: function (now) {
                    $(this).css('transform', 'translateX(' + (-30 + 30 * now) + 'px)');
                },
                complete: function () {
                    $(this).css({
                        'opacity': '',
                        'transform': ''
                    });
                }
            });
        }, 300);
    }

    // ============================================
    // 新增特效 - 新闻列表逐项渐入
    // ============================================
    function initNewsAnimation() {
        $('.page article ul li').each(function (index) {
            var $item = $(this);
            $item.css({
                'opacity': '0',
                'transform': 'translateY(15px)'
            });

            setTimeout(function () {
                $item.css({
                    'transition': 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }, 800 + index * 100);
        });
    }

    // ============================================
    // 初始化所有特效
    // ============================================
    initTypingEffect();
    initAOS();
    initSkillBars();
    initParticles();
    initHeaderScroll();
    initSidebarAnimation();
    initNewsAnimation();

})
