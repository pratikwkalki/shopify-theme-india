window.onload = function () {
  const tabPhotos = document.getElementById('tab_photos');
  if(tabPhotos){document.getElementById('tab_photos').classList.add('active');}
};
$(function(){var lastScrollTop=0,delta=5;$(window).scroll(function(){var nowScrollTop=$(this).scrollTop();if(Math.abs(lastScrollTop-nowScrollTop)>=delta){if(nowScrollTop>lastScrollTop){$('body').removeClass("page_scroll_up_new")}else{$('body').addClass("page_scroll_up_new")}
lastScrollTop=nowScrollTop}
if(nowScrollTop<30){$('body').addClass("header-init-state-enable")
$('body').removeClass("page_scroll_up_new")}else{$('body').removeClass("header-init-state-enable")}})});$(".custom_mega_menu_top_new").hover(function(){$(this).find(".mega-menu").attr("open","open");$(this).find("ul.mega-menu__list li:first").addClass("active");$(this).find(".mega-menu-box div.level2:first").css("display","flex")},function(){$(this).find(".mega-menu").removeAttr("open");$(this).find("ul.mega-menu__list li.active").removeClass("active");$(this).find(".mega-menu-box div.level2").css("display","none")})
function openCity(evt,cityName){var i,menucontentbox,menutablinks;menucontentbox=document.getElementsByClassName("level2");for(i=0;i<menucontentbox.length;i++){menucontentbox[i].style.display="none"}
menutablinks=document.getElementsByClassName("mega-tab-menu-label");for(i=0;i<menutablinks.length;i++){menutablinks[i].className=menutablinks[i].className.replace(" active","")}
document.getElementById(cityName).style.display="flex";evt.currentTarget.className+=" active"}
if (document.getElementById("new-women")) {document.getElementById("new-women").click();}
function openMobTabs(evt,tabsName){var i,tabcontentbox,mobiletablinks;tabcontentbox=document.getElementsByClassName("tabcontent-box");for(i=0;i<tabcontentbox.length;i++){tabcontentbox[i].style.display="none"}
mobiletablinks=document.getElementsByClassName("tablinks");for(i=0;i<mobiletablinks.length;i++){mobiletablinks[i].className=mobiletablinks[i].className.replace(" active","")}
document.getElementById(tabsName).style.display="flex";evt.currentTarget.className+=" active"}
function initAccordion(){$(".accordion .question").click(function(){if($(this).parent("li").hasClass("open")==!1){$(this).parents(".accordion").find(".answer").css("display","none");$(this).parents(".accordion").find("li").removeClass("open");$(this).next(".answer").css("display","block");$(this).parent(".accordion li").addClass("open")}else{$(this).parents(".accordion").find(".answer").css("display","none");$(this).parents(".accordion").find("li").removeClass("open")}})};initAccordion();function initTabsCollectionNew(){$(".tabs_collection_new").click(function(){var tab_id=$(this).attr("tab_id");$(this).parents(".tabs_collection_main_new").find(".tabs_collection_new").removeClass("active");$(this).parents(".tabs_collection_main_new").find(".tabcontent").css("display","none");$(this).addClass("active");$(this).parents(".tabs_collection_main_new").find("."+tab_id+"_open").css("display","block")})};initTabsCollectionNew();$('a[href^="#"]').on('click',function(event){var target=$($(this).attr('href'));if(target.length){event.preventDefault();$('html, body').stop().animate({scrollTop:target.offset().top},500)}});$(".Footer_common_title_new").click(function(){var width=$(document).width();if(width<750){$(this).toggleClass("active");$(this).next(".Footer_common_infos_new").slideToggle()}})
$(".read_more_new").click(function(){if($(this).hasClass("open")==!1){$(this).addClass("open");$(this).html("Read Less");$(".Collection_descriptions_infos_new").addClass("active")}else{$(this).removeClass("open");$(this).html("Read More");$(".Collection_descriptions_infos_new").removeClass("active")}})
$(".Page_our_stores_objects_detail_innerleft_innerboxs_direction_new a").click(function(){var tab_id=$(this).attr("tab_id");$(".Page_our_stores_objects_detail_innerright_mainboxs_new").css("display","none");$("."+tab_id+"_open").css("display","block");var width=$(document).width();var header=$(".header").height();if(width<750){$('html, body').animate({scrollTop:$("html, body").offset().top},500)}})
$(".play_video_on_click").click(function(){if($(this).hasClass("active")==!1){$(this).find('video').trigger('play');$(this).find('.play_btn').css("display","none");$(this).addClass("active")}else{$(this).removeClass("active");$(this).find('video').trigger('pause');$(this).find('.play_btn').css("display","flex")}})
$(".open_event_slider").click(function(){var slider_id=$(this).attr("slider_id");$(".Page_Events_sliders_mainloop_new").removeClass("active");$("."+slider_id+"_open").addClass("active")})
$(".close_slider_new").click(function(){$(".Page_Events_sliders_mainloop_new").removeClass("active")})
$(".forgot_password").click(function(){$("#login").css("display","none");$("#sign-up").css("display","none");$("#recover").css("display","block")})
$(".login_back").click(function(){$("#login").css("display","block");$("#sign-up").css("display","none");$("#recover").css("display","none")})
$(".sign-up-btn").click(function(){$("#sign-up").css("display","block");$("#login").css("display","none");$("#recover").css("display","none")})
const customerPopup=$("#sotp");$('.sotp-popup-close-btn').on('click',function(){localStorage.setItem('closedcustomerpopup','true')});if(customerPopup.length){const closeBtn=customerPopup.find("[js-close-btn]");const isCartPage=window.location.pathname.includes('/cart');const scrollTriggeredKey='closedcustomerpopupcart';$("[js-customer-popup-btn]").click(function(evt){evt.preventDefault();customerPopup.addClass("is-open")});const closedCustomerPopup=localStorage.getItem('closedcustomerpopup');if(isCartPage&&!localStorage.getItem(scrollTriggeredKey)){let scrollTriggered=!1;window.addEventListener('scroll',function(){if(!scrollTriggered){scrollTriggered=!0;localStorage.setItem(scrollTriggeredKey,'true');document.querySelector('.header__icon--account')?.click()}})}
if(!closedCustomerPopup&&!isCartPage){let scrollTriggered=!1;window.addEventListener('scroll',function(){if(!scrollTriggered){scrollTriggered=!0;document.querySelector('.header__icon--account')?.click()}})}
closeBtn.click(function(){customerPopup.removeClass("is-open");localStorage.setItem('closedcustomerpopup','true')});customerPopup.click(function({target}){if(target.classList.contains("popup-overlay")){customerPopup.removeClass("is-open");localStorage.setItem('closedcustomerpopup','true')}})}
$('[js-show-password]').on('click',function(){const field=$(this).parents(".field");console.log(field,"🚔🚔🚔🚔")
$(this).is(':checked')?field.find('#RegisterForm-password').attr('type','text'):field.find('#RegisterForm-password').attr('type','password');$(this).is(':checked')?field.find('#CustomerPassword').attr('type','text'):field.find('#CustomerPassword').attr('type','password')});$('a.printPage').click(function(){window.print();return!1});$(window).scroll(function(){if($(this).scrollTop()){$('#gototop').fadeIn()}else{$('#gototop').fadeOut()}});$("#gototop").click(function(){$("html, body").animate({scrollTop:0},1000)});$(".Index_icon_with_text_list_allloop_innerboxs_new").click(function(){var popup_id=$(this).attr("popup_id");$(".index-popup-overlay").css("display","block");$("."+popup_id+"_open").css("display","block")})
$(".Index_icon_with_text_list_allloop_popup_title_right_new, .index-popup-overlay").click(function(){$(".index-popup-overlay").css("display","none");$(".Index_icon_with_text_list_allloop_popup_new").css("display","none")})
$(".popup_manufacturing_click").click(function(){var popup_id=$(this).attr("popup_id");$(".index-popup-overlay").css("display","block");$("."+popup_id+"_open").css("display","block")})
$(".short_des .desc_more").click(function(){$(".short_des").css("display","none");$(".long_des").css("display","block")})
$(".long_des .desc_more").click(function(){$(".short_des").css("display","block");$(".long_des").css("display","none")})
$('[js-accordion-header]').click(function(){if($(this).parents(".js-accordion-item").hasClass("active")==!1){$(this).parents(".product-faq-wrapper_main-wrap").find('[js-accordion-body]').slideUp();$(this).parents(".product-faq-wrapper_main-wrap").find(".js-accordion-item").removeClass("active");$(this).next('[js-accordion-body]').slideDown();$(this).parents(".js-accordion-item").addClass("active")}else{$(this).parents(".product-faq-wrapper_main-wrap").find('[js-accordion-body]').slideUp();$(this).parents(".product-faq-wrapper_main-wrap").find(".js-accordion-item").removeClass("active")}})
$(".account_dropdown_open_new").click(function(){if($(this).hasClass("active")==!1){$(".account_dropdown_new").css("display","block");$(this).addClass("active")}else{$(".account_dropdown_new").css("display","none");$(this).removeClass("active")}})
$(document).mouseup(function(e){var container=$(".account_dropdown_open_new");if(!container.is(e.target)&&container.has(e.target).length===0){$(".account_dropdown_open_new").removeClass("active");$(".account_dropdown_new").css("display","none")}});$(".main_menu_click_open_new").click(function(){$(".Header_drawer_mobile_bottom_main_new").css("display","none")})
$(".main_menu_click_close_new").click(function(){$(".Header_drawer_mobile_bottom_main_new").css("display","block")})
$(".Customer_register_template_innerright_mainform_new .forgot_password").click(function(){$('[js-customer-popup-btn]').click()})

new Swiper('.Index_top_banner_slider',{loop:!0,grabCursor:!1,spaceBetween:0,slidesPerView:1,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},pagination:{el:".swiper-pagination",clickable:"true"},autoplay:{delay:5000,disableOnInteraction:!1,}})
new Swiper('.Index_custom_category_slider',{loop:!1,grabCursor:!1,spaceBetween:18,slidesPerGroup:1,slidesPerView:4,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},breakpoints:{0:{slidesPerView:"auto",spaceBetween:10,},749:{slidesPerView:3,spaceBetween:10,},990:{slidesPerView:4,spaceBetween:10,},1200:{slidesPerView:4,spaceBetween:18,},1440:{slidesPerView:4,spaceBetween:18,}}})
new Swiper('.visit-our-Store-slider',{loop:!1,grabCursor:!1,spaceBetween:20,slidesPerView:2,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},grid:{rows:2,},breakpoints:{0:{slidesPerView:2,spaceBetween:20,},768:{slidesPerView:4,spaceBetween:18,grid:{rows:1,}}}})
new Swiper('.Index_collection_slider',{loop:!1,grabCursor:!1,spaceBetween:15,slidesPerGroup:5,slidesPerView:5,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{0:{slidesPerGroup:1,slidesPerView:"auto",spaceBetween:8,},749:{slidesPerGroup:4,slidesPerView:4,spaceBetween:10,},990:{slidesPerGroup:4,slidesPerView:4,spaceBetween:10,},1200:{slidesPerGroup:5,slidesPerView:5,spaceBetween:15,},1440:{slidesPerGroup:5,slidesPerView:5,spaceBetween:15,}}})
new Swiper('.Index_collection_list_slider',{loop:!1,grabCursor:!1,spaceBetween:18,slidesPerGroup:6,slidesPerView:6,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},breakpoints:{0:{slidesPerGroup:2,slidesPerView:"auto",spaceBetween:8,},749:{slidesPerGroup:3,slidesPerView:3,spaceBetween:10,},990:{slidesPerGroup:4,slidesPerView:4,spaceBetween:10,},1200:{slidesPerGroup:4,slidesPerView:4,spaceBetween:18,},1440:{slidesPerGroup:4,slidesPerView:4,spaceBetween:18,}}})
new Swiper('.Index_visit_stores_slider',{loop:!1,grabCursor:!1,spaceBetween:40,slidesPerGroup:1,slidesPerView:3,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},breakpoints:{0:{slidesPerGroup:1,slidesPerView:"auto",spaceBetween:10,centeredSlides:!0,loop:!0,},749:{slidesPerGroup:1,slidesPerView:2,spaceBetween:20,},990:{slidesPerGroup:1,slidesPerView:3,spaceBetween:20,},1200:{slidesPerGroup:1,slidesPerView:3,spaceBetween:30,},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:40,}}})
new Swiper('.Index_custom_testimonials_slider',{loop:!1,grabCursor:!1,spaceBetween:40,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{0:{slidesPerGroup:1,slidesPerView:1,spaceBetween:0},992:{slidesPerGroup:1,slidesPerView:1,spaceBetween:40,},1024:{slidesPerGroup:1,slidesPerView:1,spaceBetween:40,},1280:{slidesPerGroup:1,slidesPerView:2,spaceBetween:40,}}})
new Swiper('.Index_round_column_slider',{loop:!1,grabCursor:!1,spaceBetween:12,slidesPerGroup:1,slidesPerView:"auto",watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},freeMode:!0,})
new Swiper('.Collection_meta_columns_slider',{loop:!1,grabCursor:!1,spaceBetween:40,slidesPerGroup:3,slidesPerView:3,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},breakpoints:{0:{spaceBetween:8,slidesPerGroup:3,slidesPerView:3,},749:{spaceBetween:28,slidesPerGroup:3,slidesPerView:3,},1024:{spaceBetween:40,}}})
new Swiper('.list_collection_slider',{loop:!0,grabCursor:!1,spaceBetween:20,slidesPerGroup:1,slidesPerView:"auto",watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},autoplay:{delay:3000,disableOnInteraction:!1,},breakpoints:{0:{spaceBetween:16},749:{spaceBetween:12,freeMode:!0,},1024:{spaceBetween:28,}}})
new Swiper('.Index_collection_detail_curated_slider',{loop:!1,grabCursor:!1,spaceBetween:20,slidesPerGroup:1,slidesPerView:"auto",watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},breakpoints:{0:{spaceBetween:12,freeMode:!1,},749:{spaceBetween:20,freeMode:!0,},990:{spaceBetween:20,}}})
new Swiper('.Page_collection_detail_columns_slider',{loop:!1,grabCursor:!1,spaceBetween:30,slidesPerGroup:3,slidesPerView:3,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},breakpoints:{0:{spaceBetween:12,slidesPerView:"auto",centeredSlides:!0,loop:!0,freeMode:!1,slidesPerGroup:1,},749:{spaceBetween:20,freeMode:!0,slidesPerGroup:3,},990:{spaceBetween:30,}}})
new Swiper('.Page_about_us_milstone_slider',{loop:!1,grabCursor:!1,spaceBetween:20,slidesPerGroup:1,slidesPerView:4,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},breakpoints:{0:{slidesPerGroup:1,slidesPerView:"auto",},749:{slidesPerGroup:1,slidesPerView:"auto",},990:{slidesPerGroup:1,slidesPerView:"auto",},1200:{slidesPerGroup:1,slidesPerView:4,},1440:{slidesPerGroup:1,slidesPerView:4,}}})
new Swiper('.page_store_detail_tabs_slider',{loop:!1,grabCursor:!1,spaceBetween:18,slidesPerGroup:5,slidesPerView:5,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},observer:!0,observeParents:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},breakpoints:{0:{slidesPerGroup:2,slidesPerView:"auto",spaceBetween:8,},749:{slidesPerGroup:4,slidesPerView:4,spaceBetween:10,},990:{slidesPerGroup:4,slidesPerView:4,spaceBetween:10,},1200:{slidesPerGroup:5,slidesPerView:5,spaceBetween:15,},1440:{slidesPerGroup:5,slidesPerView:5,spaceBetween:15,}}})
new Swiper('.Page_lookbook_slider',{loop:!1,grabCursor:!1,spaceBetween:0,slidesPerGroup:1,slidesPerView:1,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},pagination:{el:".swiper-pagination",type:"fraction",}})
new Swiper('.Page_video_testimonials_slider',{loop:!0,grabCursor:!1,spaceBetween:0,slidesPerGroup:1,slidesPerView:1,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},pagination:{el:".swiper-pagination",clickable:!0}})
var Page_testimonial_slider_Thumbs=new Swiper(".Page_testimonial_slider_Thumbs",{grabCursor:!1,spaceBetween:12,slidesPerView:7,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},centeredSlides:!0,allowTouchMove:!1,a11y:!1,loop:!0,breakpoints:{0:{spaceBetween:9,},749:{spaceBetween:12,}}});var Page_testimonial_slider=new Swiper('.Page_testimonial_slider',{loop:!0,grabCursor:!1,spaceBetween:0,slidesPerView:1,watchSlidesProgress:!0,draggable:!0,autoHeight:!0,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},thumbs:{swiper:Page_testimonial_slider_Thumbs,},a11y:!1,})
new Swiper('.Product_bridal_list_new',{loop:!1,grabCursor:!1,spaceBetween:15,slidesPerGroup:1,slidesPerView:5,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{0:{slidesPerGroup:1,slidesPerView:"auto",spaceBetween:8},749:{slidesPerGroup:1,slidesPerView:5,spaceBetween:15,},990:{},1200:{},1440:{}}})
new Swiper('.Page_event_slider',{loop:!0,grabCursor:!1,spaceBetween:0,slidesPerView:1,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},pagination:{el:".swiper-pagination",clickable:!0},direction:"vertical"})
new Swiper('.page_store_google_slider',{loop:!0,autoplay:!0,observer:!0,observeParents:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{320:{slidesPerView:1,spaceBetween:30,},992:{slidesPerView:2,spaceBetween:60,},1280:{slidesPerView:2,spaceBetween:60,},}})
new Swiper('.Page_weaves_collection_slider',{loop:!1,grabCursor:!1,spaceBetween:20,slidesPerGroup:1,slidesPerView:4,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{0:{slidesPerGroup:1,slidesPerView:2,spaceBetween:10,},749:{slidesPerView:3,spaceBetween:10,},990:{slidesPerView:3,spaceBetween:10,},1200:{slidesPerView:4,spaceBetween:15,},1440:{}}})
new Swiper('.Page_weaves_images_slider',{loop:!1,grabCursor:!1,spaceBetween:20,slidesPerGroup:1,slidesPerView:1,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},pagination:{el:".swiper-pagination",clickable:!0}})
new Swiper('.Collection_custom_category_slider',{loop:!1,grabCursor:!1,spaceBetween:26,slidesPerGroup:1,slidesPerView:7,watchSlidesProgress:!0,draggable:!0,autoHeight:!1,watchOverflow:!0,threshold:10,mousewheel:{forceToAxis:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},breakpoints:{0:{slidesPerView:"auto",spaceBetween:26,},749:{slidesPerView:"auto",spaceBetween:20,},990:{slidesPerView:7,spaceBetween:26,},1200:{slidesPerView:7,spaceBetween:26,},1440:{slidesPerView:7,spaceBetween:26,}}})
  
const footerCartDrawerButton=document.querySelector('[js-footer-cart-drawer-btn]')
if(footerCartDrawerButton){const cartDrawer=document.querySelector('cart-drawer');footerCartDrawerButton.addEventListener('click',function(){cartDrawer?.open()})}
var content=document.querySelector("#shopify-section-template--22866303058200__172473426029f5fa52");const magicToolboxContainer=document.querySelector(".MagicToolboxContainer");if(content&&magicToolboxContainer){magicToolboxContainer.appendChild(content)}
document.addEventListener("DOMContentLoaded",function(){const sections=document.querySelectorAll('.lazy-load-section');const observer=new IntersectionObserver(function(entries,observer){entries.forEach(entry=>{if(entry.isIntersecting){const section=entry.target;const template=section.querySelector('template');if(template){const clone=document.importNode(template.content,!0);section.appendChild(clone);observer.unobserve(section)}}})},{threshold:0.5});sections.forEach(section=>{observer.observe(section)})});document.addEventListener('DOMContentLoaded',()=>{const formContainer=document.querySelector('.form-container');const observer=new MutationObserver((mutationsList,observer)=>{const form=document.querySelector('form-embed');if(form){observer.disconnect();const shadow=form.shadowRoot;const sheet=new CSSStyleSheet();sheet.insertRule(`
  ._formContainer_stahb_30 {max-width: 900px !important;}
  `);shadow.adoptedStyleSheets.push(sheet);if(formContainer){formContainer.classList.add('loaded')}}});observer.observe(document.body,{childList:!0,subtree:!0})})


document.addEventListener("DOMContentLoaded", function () {
  const handleUserInteraction = () => {
    const freshChatScript = document.createElement("script");
    freshChatScript.src = `https://snippets.freshchat.com/js/fc-pre-chat-form-v2.js`; // Replace with your GTAG ID
    freshChatScript.async = true;
    freshChatScript.id = "fresh-chat-script";
    document.head.appendChild(freshChatScript);
    // Fresh Chat
    const inlineFCscript = `
      function initFreshChat() {
        window.fcWidget && window.fcWidget.init({
            token: "ae1f4225-593d-4a31-96b7-785aa10b503c",
            host: "https://kalki.freshchat.com",
            widgetUuid: "acc989a9-53a1-480e-bb6a-d6ec8b9d8cbb"
        });
    }
    function initialize(i, t) {
        var e;
        i.getElementById(t) ? initFreshChat() : ((e = i.createElement("script")).id = t, e.async = !0, e.src = "https://kalki.freshchat.com/js/widget.js", e.onload = initFreshChat, i.head.appendChild(e))
    }
    function initiateCall() {
        initialize(document, "Freshchat-js-sdk")
    }
    initiateCall()
    `;
    const inlineFCscriptObj = document.createElement("script");
    inlineFCscriptObj.id = "fresh-chat-init";
    inlineFCscriptObj.textContent = inlineFCscript;
    document.head.appendChild(inlineFCscriptObj);

    // getelevar
    const inlineElevarScript = `
      const execute = async api => {
        const config = (await import("https://shopify-gtm-suite.getelevar.com/configs/8ce1d25f3fbabd19e1e3154f4f5491047ddbeba1/config.js")).default;
        const scriptUrl = config.script_src_web_pixel_lax_custom;
        if (scriptUrl) {
          const { handler } = await import(scriptUrl);
          await handler(api, config);
        }
      };
      execute();
    `;
    const inlineElevarScriptObj = document.createElement("script");
    inlineElevarScriptObj.id = "elevar-init";
    inlineElevarScriptObj.textContent = inlineElevarScript;
    document.head.appendChild(inlineElevarScriptObj);

    // clarity
    const inlineClarityScript = `
      (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "qjx3burd9q");
    `;
    const inlineClarityScriptObj = document.createElement("script");
    inlineClarityScriptObj.id = "clarity-init";
    inlineClarityScriptObj.textContent = inlineClarityScript;
    document.head.appendChild(inlineClarityScriptObj);    

    // visenze
    const inlineVisenzeScript = '!function(x,e,t,n,r,i,a){var o=localStorage.getItem("va-uid")||function x(){let e=new Date().getTime(),t="xxxxxxxx.xxxx.4xxx.yxxx.xxxxxxxxxxxx".replace(/[xy]/g,x=>{let t=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===x?t:3&t|8).toString(16)});return t}(),c=x.getElementsByTagName(e)[0],d=x.createElement(e),g=new URL(`https://search.visenze.com/v2/widget-init?app_key=${t}&placement_id=${n}&container=${r}&uid=${o}`);i&&(g+=`&contexts=${i}`),d.async=!0,d.src=g,d.onload=function(){a&&a()},c.parentNode.insertBefore(d,c)}(document,"script","6c794e28d7ce49ba80632f510585c74a","7683",".ps-widget-5971");';
    const inlineVisenzeScriptObj = document.createElement("script");
    inlineVisenzeScriptObj.id = "visenze-init";
    inlineVisenzeScriptObj.textContent = inlineVisenzeScript;
    document.head.appendChild(inlineVisenzeScriptObj);   
    
    // Remove event listeners after execution
    window.removeEventListener("click", handleUserInteraction);
    window.removeEventListener("scroll", handleUserInteraction);
    window.removeEventListener("keydown", handleUserInteraction);
    window.removeEventListener("mousemove", handleUserInteraction);
    window.removeEventListener("touchstart", handleUserInteraction);
    window.removeEventListener("touchmove", handleUserInteraction);
  };
  // Add event listeners to detect user interaction
  window.addEventListener("click", handleUserInteraction);
  window.addEventListener("scroll", handleUserInteraction);
  window.addEventListener("keydown", handleUserInteraction);
  window.addEventListener("mousemove", handleUserInteraction);
  window.addEventListener("touchstart", handleUserInteraction);
  window.addEventListener("touchmove", handleUserInteraction);
  // Clean up event listeners when no longer needed
  window.addEventListener("beforeunload", () => {
    window.removeEventListener("click", handleUserInteraction);
    window.removeEventListener("scroll", handleUserInteraction);
    window.removeEventListener("keydown", handleUserInteraction);
    window.removeEventListener("mousemove", handleUserInteraction);
    window.removeEventListener("touchstart", handleUserInteraction);
    window.removeEventListener("touchmove", handleUserInteraction);
  });
});

const VpnLocationScript=document.querySelector('script[src*="content/location/location.js"]');const VpnHistoryScript=document.querySelector('script[src*="libs/extend-native-history-api.js"]');const VpnRequestsScript=document.querySelector('script[src*="libs/requests.js"]');const VpnExecutersScript=document.querySelector('script[src*="executers/vi-tr.js"]');if(VpnLocationScript&&VpnHistoryScript&&VpnRequestsScript&&VpnExecutersScript){VpnLocationScript.remove();VpnHistoryScript.remove();VpnRequestsScript.remove();VpnExecutersScript.remove()}
document.addEventListener("DOMContentLoaded",function(){if(window.innerWidth>=768){document.querySelectorAll('.card-wrapper [data-no-blank]').forEach(function(link){if(link.hasAttribute('data-no-blank')){link.setAttribute('target','_blank')}})}})
