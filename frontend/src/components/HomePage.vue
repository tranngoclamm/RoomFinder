<template>
    <div id="app">
      <header class="header header__background">
        <div class="header__navbar">
          <div class="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-dark">
              <a class="navbar-brand" href="/">
                <img src="@/assets/images/logo_white.svg" alt="RentRoom" ref="logo" />
              </a>
  
              <div class="lang__currency lang_top d-block d-sm-none">
                <div class="dropdown white">
                  <a
                    href="#"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="dropdownMenuLang"
                  >
                    <img src="@/assets/images/flags/united-kingdom.svg" /> <span>ENG</span>
                    <i class="fas fa-chevron-up fa-xs"></i>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLang">
                    <a href="ro.html" class="dropdown-item">
                      <img src="@/assets/images/flags/romania.svg" /> Ro
                    </a>
                    <a href="ru.html" class="dropdown-item">
                      <img src="@/assets/images/flags/russia.svg" /> Rus
                    </a>
                  </div>
                </div>
              </div>
  
              <button
                class="navbar-toggler header__hamburger-wrap"
                type="button"
              >
                <div
                  class="hamburger-icon"
                  @click="hamburgerMenu('logo_white')"
                  :class="{ open: hamburger_menu }"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
              <transition name="fade">
                <div
                  :class="{'d-block':hamburger_menu}"
                  class="header__navbar-collapse-mobile collapse navbar-collapse"
                  id="navbarText"
                >
                  <div class="header__navbar-collapse-mobile-wrap navbar-collapse">
                    <ul class="navbar-nav mx-auto ps-2">
                      <li class="nav-item">
                        <a class="nav-link" href="ru/list.html">
                          <span>Cho thuê phòng trọ</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="ru/auto.html">
                          <span>Cho thuê nhà ở</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="ru/terms_and_conditions.html">
                          <span>Cho thuê căn hộ</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="ru/questions_and_answers.html">
                          <span>Tìm người ở ghép</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <div
                          class="calltoaction__text"
                          @mouseover="animation.phone = true"
                          @mouseleave="animation.phone = false"
                        >
                          <a href="#" @click="openCall2action">
                            <div
                              v-bind:class="{ 'shake animated slow infinite': animation.phone }"
                              style="display: inline-block;"
                            >
                              <img
                                src="@/assets/images/ic-heart.svg"
                                class="icon ms-2 ic-heart"
                                alt=""
                              />
                            </div>
                          </a>
                        </div>
                      </li>
                    </ul>
                    <div class="header__navbar-lang-mobile">
                      <div class="lang__currency">
                        <div class="dropup">
                          <a
                            href="#"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            id="dropdownMenuCurrency"
                          >
                            <img
                              src="@/assets/images/flags/european-union.svg"
                            />
                            <span> EUR</span>
                            <i class="fas fa-chevron-up fa-xs"></i>
                          </a>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuCurrency">
                            <a
                              href="#"
                              class="dropdown-item"
                              @click="setCurrency('EUR')"
                            >
                              <img
                                src="@/assets/images/flags/european-union.svg"
                              />
                              EUR
                            </a>
                            <a
                              href="#"
                              class="dropdown-item"
                              @click="setCurrency('GBP')"
                            >
                              <img
                                src="@/assets/images/flags/united-kingdom.svg"
                              />
                              GBP
                            </a>
                            <a
                              href="#"
                              class="dropdown-item"
                              @click="setCurrency('RUB')"
                            >
                              <img
                                src="@/assets/images/flags/russia.svg"
                              />
                              RUB
                            </a>
                            <a
                              href="#"
                              class="dropdown-item"
                              @click="setCurrency('USD')"
                            >
                              <img
                                src="@/assets/images/flags/united-states.svg"
                              />
                              USD
                            </a>
                            <a
                              href="#"
                              class="dropdown-item"
                              @click="setCurrency('RON')"
                            >
                              <img
                                src="@/assets/images/flags/romania.svg"
                              />
                              RON
                            </a>
                            <a
                              href="#"
                              class="dropdown-item"
                              @click="setCurrency('MDL')"
                            >
                              <img
                                src="@/assets/images/flags/moldova.svg"
                              />
                              MDL
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <span class="navbar-text pe-2">
                      <div class="calltoaction ms-1">
                        <div class="login-nav">
                          <!-- <a href="login"> Đăng nhập</a> -->
                          <div class="position-relative btn-login"  @click="openModal">
                            <img src="@/assets/images/ic-edit-white.svg" alt="" class="ic-edit-white icon me-2">
                            <a class="ps-4 btn__post-new">Đăng tin</a>
                          </div>

                           <div class="avatar ms-2 d-flex align-items-center jutify-content-center">

                             <img src="@/assets/images/default-user.svg" alt="avatar">

                             <div class="dropdown ms-2">
                              <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Nguyễn 
                              </a>
                            
                              <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Thông tin</a></li>
                                <li><a class="dropdown-item" href="#">Quản lý tin</a></li>
                                <li><a class="dropdown-item" href="#">Đổi mật khẩu</a></li>
                                <li><a class="dropdown-item" href="#">Liên hệ</a></li>
                                <li><a class="dropdown-item" href="#">Đăng xuất</a></li>
                              </ul>
                            </div>
                             <!-- <span class="ms-2 btn__post-new"> Nguyễn</span> -->
                            <!-- <a href="/login" class="pe-4 btn__post-new">Đăng nhập</a> -->

                           </div>
                      </div>
                    </div>
                    </span>

                    <div class="header__navbar-socials-mobile">
                      <ul class="list-inline hero__footer__social">
                        <li class="list-inline-item">
                          <a
                            href="https://www.facebook.com/rentroom.md/"
                            target="_blank"
                            >facebook</a
                          >
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="https://www.instagram.com/rentroom.md/"
                            target="_blank"
                            >instagram</a
                          >
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="https://m.me/rentroom.md"
                            target="_blank"
                            >messenger</a
                          >
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="viber://chat?number=37378242428"
                            target="_blank"
                            >viber</a
                          >
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="https://wa.me/37378242428"
                            target="_blank"
                            >whatsapp</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </transition>
            </nav>
          </div>
        </div>
  
        <div class="hero">
          <div class="hero__center">
            <div class="container">
              <h1>Phòng cho thuê hàng đầu tại Việt Nam</h1>
              <h2>Tìm kiếm phòng trọ chất lượng tại mọi địa điểm. Đặt phòng ngay!</h2>
              <div class="booking__form">
                <div class="booking__form__block">
                  <form action="#" method="POST">
                    <input type="hidden" name="_token" value="MJs5ZincYZd6Ayt0cq3xfItS3Dm0GSJlfZ3SuRTt" />
                    <input type="hidden" name="type_rent" v-model="config.selected.id" />
                    <input type="hidden" name="date" v-model="booking__data.string" />
                    <input type="hidden" name="people" v-model="peoples" />
                    <div class="row">
                      <div class="col-12 col-lg-3">
                        <div class="booking__form__block__el brd_right">
                          <label for="">LOẠI CHO THUÊ</label>
                          <div class="booking__form__block__el__input">
                            <div data-v-7e7894dc="" class="dropdown" style="--options-height: 35px; --options-height-neg: -35px; --option-height: 35px; --main-el-border-radius: 0; --dropdown-width: 180px; --dropdown-background-color: #cde4f5; --dropdown-expanded-color: #fff; --dropdown-border: 1px solid gray; --dropdown-hover-background-color: #0084d4; --dropdown-default-text-color: black;">
                              <div data-v-7e7894dc="" class="dropdown-label-container">
                                <div data-v-7e7894dc="" class="dropdown-label">
                                  <span data-v-7e7894dc="" class="text">NHÀ Ở</span>
                                  <i data-v-7e7894dc="" class="angle-down"></i>
                                </div>
                              </div>
                              <!-- <div data-v-7e7894dc="" class="options expand" style="opacity: 1; height: auto;" aria-expanded="false">
                                <div data-v-7e7894dc="" class="option">
                                  <i data-v-7e7894dc="" class="icon-type_construction"></i>PHÒNG TRỌ
                                </div>
                              </div> -->
                            </div>
                          </div>

                        </div>
                      </div>
                      <div class="col-12 col-lg-3">
                        <div class="booking__form__block__el brd_right">
                          <label for="">Khu vực</label>
                          <div class="booking__form__block__el__input">
                            <div data-v-78fbf3d8="" class="dpicker__container">
                              <input data-v-78fbf3d8="" type="text"  class="dpicker__input" id="area-search" placeholder="Chọn khu vực">
                               <i data-v-78fbf3d8="" class="angle-down"></i>
                            </div>

                            <!-- <div data-v-502e251a="" class="dropdown expanded" ><div data-v-502e251a="" class="dropdown-label-container"><div data-v-502e251a="" class="dropdown-label"><span data-v-502e251a="" class="text">
                           </span> <i data-v-502e251a="" class="angle-down toggled"></i></div></div> <div data-v-502e251a="" class="options expand" style="opacity: 1; height: auto;" aria-expanded="true"><div data-v-502e251a="" class="option">
                                    Adults<span data-v-502e251a=""><i data-v-502e251a="" class="fas fa-chevron-left"></i> <b data-v-502e251a="">1</b> <i data-v-502e251a="" class="fas fa-chevron-right"></i></span></div><div data-v-502e251a="" class="option">
                                    Children<span data-v-502e251a=""><i data-v-502e251a="" class="fas fa-chevron-left text-grey"></i> <b data-v-502e251a="">0</b> <i data-v-502e251a="" class="fas fa-chevron-right"></i></span></div> <div data-v-502e251a="" class="option option_delete">
                                   Apply
                               </div></div>
                              </div> -->

                            <!-- <div data-v-78fbf3d8="" class="dpicker__container">
                              <input data-v-78fbf3d8="" type="text"  class="dpicker__input" id="area-search" placeholder="Chọn khu vực">
                               <i data-v-78fbf3d8="" class="angle-down"></i>
                            </div> -->
                          </div>
                        </div>
                      </div>
                      <div class="col-12 pe-0 col-lg-2 brd_right">
                        <div class="booking__form__block__el">
                          <label for="">Khoảng giá</label>
                          <div class="booking__form__block__el__input">
                            <div data-v-78fbf3d8="" class="dpicker__container">
                              <input data-v-78fbf3d8="" type="text"  class="dpicker__input" id="price-search" placeholder="Chọn giá">
                               <i data-v-78fbf3d8="" class="angle-down"></i>
                               <!---->
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 pe-0 col-lg-2 brd_right">
                        <div class="booking__form__block__el">
                          <label for="">Diện tích</label>
                          <div class="booking__form__block__el__input">
                            <div data-v-78fbf3d8="" class="dpicker__container">
                              <input data-v-78fbf3d8="" type="text"  class="dpicker__input" id="size-search" placeholder="Chọn diện tích">
                               <i data-v-78fbf3d8="" class="angle-down"></i>
                               <!---->
                            </div>
                          </div>

                        </div>
                      </div>
                      <div class="col-12 col-lg-2">
                        <div class="booking__form__block__el">
                          <div class="btn__submit__wrap">
                            <button type="submit" class="search_btn">Tìm</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  
      <!-- <main>
        <div class="container">
          <section class="section">
            <h2 class="section__title">Khám phá phòng cho thuê</h2>
            <div class="row">
              <div class="col-12 col-sm-6 col-md-4" v-for="item in rooms" :key="item.id">
                <div class="card">
                  <img :src="item.image" class="card-img-top" :alt="item.title" />
                  <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">{{ item.description }}</p>
                    <a :href="'room-details.html?id=' + item.id" class="btn btn-primary">Chi tiết</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
  
      <footer>
        <div class="container">
          <p>&copy; 2024 RentRoom. All rights reserved.</p>
        </div>
      </footer> -->
    </div>

    <RoomCategory /> <!-- Sử dụng component RoomCategory ở đây -->
    <PostNewModal v-if="showModal" @close-modal="closeModal" />
                   <!-- Modal (sử dụng v-if để hiển thị modal) -->
                          <!-- <div v-if="showModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
                            <div class="modal-dialog modal-dialog-scrollable" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title">Đăng tin</h5>
                                  <button type="button" class="close" @click="closeModal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  
                                      <div class="newpost-box mt-2">
                                        <div class="form-layout detail-section">
                                            <div class="form-group detail-section-category w-100">
                                                <label>Chuyên mục cho thuê <span>*</span></label>
                                                <select class="form-select" id="ddlPostCate" name="CategoryId" data-val="true" data-val-required="Vui lòng chọn chuyên mục">
                                                    <option value="" disabled="" selected="">Chọn chuyên mục</option>
                                                <option value="1">Cho thuê phòng trọ</option><option value="11">Cho thuê căn hộ</option><option value="2">Cho thuê nhà</option><option value="3">Tìm người ở ghép</option></select>
                                                <span class="field-validation-valid text-danger" data-valmsg-for="CategoryId" data-valmsg-replace="true"></span>
                                            </div>

                                            <div class="form-group w-100 has-count js-count-title">
                                              <label><div>Tiêu đề <span>*</span> </div></label>
                                              <input class="form-control text-box single-line" data-val="true" data-val-maxlength="Tiêu đề tin tối đa là 150 ký tự" data-val-maxlength-max="150" data-val-required="Vui lòng nhập tiêu đề tin" id="Title" maxlength="150" name="Title" type="text" value="">                            <span class="field-validation-valid text-danger" data-valmsg-for="Title" data-valmsg-replace="true"></span>
                                          </div>
                                            <div class="form-group">
                                              <label>Tỉnh/thành phố <span>*</span></label>
                                              <select id="ddlProvince" name="ProvinceId" class="form-select select_city js-config-select2" aria-placeholder="Chọn tỉnh/thành phố">
                                                <option value="">Chọn tỉnh/ Tp</option>
                                                <option value="SG">Hồ Chí Minh</option>
                                                <option value="HN">Hà Nội</option>
                                                <option value="DDN">Đà Nẵng</option>
                                              </select>
                                            </div>
                                          
                                            <div class="form-group">
                                              <label>Quận/huyện <span>*</span></label>
                                              <select id="ddlDistrict" name="DistrictId" class="form-select select_district js-config-select2">
                                                <option value="">-- Quận/huyện --</option>
                                                <option value="72">Bình Chánh</option>
                                                <option value="65">Bình Tân</option>
                                              </select>
                                            </div>
                                          
                                            <div class="form-group">
                                              <label>Phường/xã</label>
                                              <select id="ddlWard" name="WardId" class="form-select select_ward js-config-select2">
                                                <option value="">-- Phường/xã --</option>
                                              </select>
                                            </div>
                                          
                                            <div class="form-group">
                                              <label>Đường/phố</label>
                                              <select id="ddlStreet" name="StreetId" class="form-select select_street js-config-select2">
                                                <option value="">-- Đường/phố --</option>
                                              </select>
                                            </div>
                                          
                                            <div class="form-group w-100">
                                              <label>Địa chỉ chính xác</label>
                                              <input class="form-control" id="txtAddress" name="Address" placeholder="Địa chỉ chính xác" type="text">
                                            </div>
                                          
                                            <div class="form-group detail-section-price">
                                                <label>Giá <span>*</span> <span id="lblPrice" style="font-size:13px;"></span></label>
                                                <input class="form-control text-box single-line" data-val="true" data-val-number="Giá nhập không đúng" data-val-required="Vui lòng nhập giá" decimal="true" id="Price" maxlength="6" name="Price" placeholder="Nhập giá (triệu đồng)" type="text" value="">
                                              </div>
                                            <div class="form-group detail-section-area">
                                                <label>Diện tích</label>
                                                <input class="form-control text-box single-line" data-val="true" data-val-number="Diện tích nhập không đúng" data-val-required="Vui lòng nhập diện tích" decimal="true" id="Area" maxlength="6" name="Area" numbersonly="true" placeholder="Nhập diện tích (m2)" type="text" value="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="newpost-box mt-4">
                                      <div class="form-layout detail-section">

                                          <div class="form-group w-100 has-count js-count-desc">
                                              <label>
                                                  <div>Mô tả <span>*</span></div>
                                              </label>
                                              <textarea class="form-control desc-field" cols="20" data-val="true" data-val-required="Vui lòng nhập nội dung" id="Detail" maxlength="5000" name="Detail" rows="2"></textarea>
                                              <span class="field-validation-valid text-danger" data-valmsg-for="Detail" data-valmsg-replace="true"></span>
                                          </div>
                                      </div>
                                  </div>

                                    
                            
                                  
                                    <div class="newpost-box mt-4">
                                        <div class="form-layout">
                                            <div class="form-group w-100">
                                              <label>
                                                <div>Hình ảnh / Video <span></span></div>
                                            </label>                      
                                                <div class="wrapper upload-image-area w-100">
                                                  <form action="#" class="w-100">
                                                    <input class="file-input" type="file" name="file" hidden>
                                                    <i class="fas fa-cloud-upload-alt"></i>
                                                    <p>Browse File to Upload</p>
                                                  </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="newpost-box mt-4">
                                        <h4 class="box-title">Liên hệ</h4>
                                        <div class="form-layout contact-section">
                                            <div class="form-group">
                                                <label>Tên <span>*</span></label>
                                                <input value="Usename" class="form-control text-box single-line" data-val="true" data-val-required="Vui lòng nhập tên liên hệ" id="ContactName" name="ContactName" type="text">
                                                <span class="field-validation-valid text-danger" data-valmsg-for="ContactName" data-valmsg-replace="true"></span>
                                            </div>
                                            <div class="form-group">
                                                <label>Số điện thoại <span>*</span></label>
                                                
                                                <input value="" class="form-control text-box single-line" data-val="true" data-val-required="Vui lòng nhập số điện thoại" id="ContactMobile" inputmode="decimal" maxlength="10" name="ContactMobile" numbersonly="true" type="number">
                                                <span class="field-validation-valid text-danger" data-valmsg-for="ContactMobile" data-valmsg-replace="true"></span>
                              
                                            </div>
                                            <div class="form-group">
                                                <label>Zalo</label>
                                                
                                                <input value="" class="form-control text-box single-line" id="ContactPhone" inputmode="decimal" maxlength="10" name="ContactPhone" numbersonly="true" type="text">
                                            </div>
                                        </div>
                                    </div>

                                     <div class="newpost-box mt-4">
                                        <h2 class="box-title">Chọn gói đăng tin</h2>
                                        <div class="form-layout package-section">
                                            <div class="form-group w-100">
                                                <label class="d-flex justify-content-between">
                                                    <div>Loại tin <span>*</span></div>
                                                    <div class="compare-package fw-normal">
                                                        <i class="icon"></i>
                                                        <a href="/bang-gia-dich-vu.html" target="_blank">
                                                            So sánh các gói tin
                                                        </a>
                                                    </div>
                                                </label>
                                                
                                                <select class="form-select" id="ddlVipType" name="VipType" data-val="true" data-val-required="Vui lòng chọn loại tin"><option value="0">Tin Vip 1 (30.000/ngày)</option><option value="1">Tin Vip 2 (20.000/ngày)</option><option value="2">Tin Vip 3 (15.000/ngày)</option><option value="5">Tin thường (2.000/ngày)</option></select>
                                                <span class="field-validation-valid text-danger" data-valmsg-for="VipType" data-valmsg-replace="true"></span>
                                            </div>
                                            <div class="form-group w-100" style="display:none">
                                                <label>Gói thời gian <span>*</span></label>
                                                <select class="form-select" id="ddlPackage" name="Package" data-val="true" data-val-required="Vui lòng chọn gói tin">
                                                    <option value="1">Đăng theo ngày</option>
                                                    <option value="2">Đăng theo tuần</option>
                                                    <option value="3">Đăng theo tháng</option>
                                                </select>
                                                <span class="field-validation-valid text-danger" data-valmsg-for="Package" data-valmsg-replace="true"></span>
                                            </div>
                                            <div class="form-group w-100">
                                                <label>Số ngày <span>*</span></label>
                                                <select class="form-select" id="ddlTotalDay" name="TotalDay" data-val="true" data-val-required="Vui lòng chọn số ngày"><option value="3">3 ngày</option><option value="4">4 ngày</option><option value="5">5 ngày</option><option value="6">6 ngày</option><option value="7">7 ngày</option><option value="8">8 ngày</option><option value="9">9 ngày</option><option value="10">10 ngày</option><option value="11">11 ngày</option><option value="12">12 ngày</option><option value="13">13 ngày</option><option value="14">14 ngày</option><option value="15">15 ngày</option><option value="16">16 ngày</option><option value="17">17 ngày</option><option value="18">18 ngày</option><option value="19">19 ngày</option><option value="20">20 ngày</option><option value="21">21 ngày</option><option value="22">22 ngày</option><option value="23">23 ngày</option><option value="24">24 ngày</option><option value="25">25 ngày</option><option value="26">26 ngày</option><option value="27">27 ngày</option><option value="28">28 ngày</option><option value="29">29 ngày</option><option value="30">30 ngày</option></select>
                                                <span class="field-validation-valid text-danger" data-valmsg-for="TotalDay" data-valmsg-replace="true"></span>
                                            </div>
                                            <div class="form-group w-100">
                                                <label>Gắn nhãn</label>
                                                <label class="d-flex align-items-center fw-normal">
                                                    <input type="checkbox" name="AddLabel" id="AddLabel" class="me-1"> Thuê nhanh (5.000đ/lần)
                                                </label>
                                            </div>
                                            <div class="form-group auto-up w-100">
                                                <h3 class="auto-up-title">Đẩy tin tự động</h3>
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" id="AutoPostID" name="AutoPost">
                                                </div>
                                                <div class="row-item" id="divAutoPost" style="display:none">
                                                    <span>Thời gian:</span>
                                                    <select style="width:60px" id="ddlTimeUp" name="TimeUp" data-val="true" data-val-required="Vui lòng chọn thời gian">
                                                    <option value="1">1 h</option><option value="2">2 h</option><option value="3">3 h</option><option value="4">4 h</option><option value="5">5 h</option><option value="6">6 h</option><option value="7" selected="">7 h</option><option value="8">8 h</option><option value="9">9 h</option><option value="10">10 h</option><option value="11">11 h</option><option value="12">12 h</option><option value="13">13 h</option><option value="14">14 h</option><option value="15">15 h</option><option value="16">16 h</option><option value="17">17 h</option><option value="18">18 h</option><option value="19">19 h</option><option value="20">20 h</option><option value="21">21 h</option><option value="22">22 h</option><option value="23">23 h</option></select>&nbsp;mỗi ngày
                                                </div>
                                                <div class="auto-up-desc">
                                                    Giúp tin của bạn được đẩy lên vị trí mới nhất trong gói tin đã đăng ký, tin đăng
                                                    sẽ được nhiều người nhìn thấy và BĐS sẽ được giao dịch nhanh hơn. <a href="/bang-gia-dich-vu.html" target="_blank">Bảng giá đẩy tin</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="newpost-box mt-4">
                                        <div class="payment-info">
                                            <h3 class="payment-info-title">
                                                Thông tin thanh toán
                                            </h3>
                                            <div class="payment-info-row">
                                                <span>Loại tin:</span>
                                                <span id="vip_cofig_info_explain">Đứng đầu danh sách các tin đăng. Tiêu đề <span style="color:#E13427;font-weight:bold">TIÊU ĐỀ MÀU ĐỎ, IN HOA</span></span>
                                            </div>
                                            <div class="payment-info-row" style="display:none">
                                                <span>Gói thời gian:</span>
                                                <span>Đăng theo <span class="lblPackage">ngày</span></span>
                                            </div>
                                            <div class="payment-info-row">
                                                <span>Đơn giá:</span>
                                                <span id="lblUnitPrice">30.000</span>
                                            </div>
                                            <div class="payment-info-row">
                                                <span>Số <span class="lblPackage">ngày</span>:</span>
                                                <span id="lblTotalDay">3</span>
                                            </div>
                                            <div class="payment-info-row" id="ThueNhanh" style="display: none">
                                                <span>Thuê nhanh:</span>
                                                <span id="lblThueNhanh">5.000</span>
                                            </div>
                                            <div class="payment-info-row">
                                                <span>Ngày hết hạn:</span>
                                                <span id="lblEndDate">3/10/2024 2:13</span>
                                            </div>
                                            <div class="payment-info-row">
                                                <span>Thành tiền:</span>
                                                <span class="total" id="lblCost">90.000</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="newpost-box newpost-submit">
                                        <button type="submit" class="btn btn-success" id="btnPostCreate">Đăng tin và thanh toán</button>
                                        <div id="message"></div>
                                    </div> 
                                </div>

                                <div class="modal-footer">
                                  <button type="button" class="btn btn-primary w-100">Đăng tin</button>
                                </div>

                                </div>
                              </div>
                            </div>
                           -->
                          
                           <!-- Overlay mờ phía sau modal -->
                          <!-- <div v-if="showModal" class="modal-backdrop fade show"></div> -->
</template>
  
<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/app.css'; // Nhúng file CSS
import RoomCategory from './RoomCategory.vue';
import PostNewModal from './PostNewModal.vue';
import 'bootstrap/dist/js/bootstrap.bundle.js';

export default {
  components: {
    RoomCategory,
    PostNewModal,
  },
  data() {
    return {
      showModal: false, // Trạng thái để điều khiển modal
      animation: {
        phone: false,
      },
      config: {
        selected: {
          id: null,
        },
      },
      booking__data: {
        string: '',
      },
      peoples: 1,
      rooms: [
        // Sample data for rooms
        { id: 1, title: 'Phòng 1', description: 'Mô tả phòng 1', image: 'images/room1.jpg' },
        { id: 2, title: 'Phòng 2', description: 'Mô tả phòng 2', image: 'images/room2.jpg' },
        { id: 3, title: 'Phòng 3', description: 'Mô tả phòng 3', image: 'images/room3.jpg' },
      ],
      hamburger_menu: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true; // Mở modal
    },
    closeModal() {
      this.showModal = false; // Đóng modal
    },
  },
};
</script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>

