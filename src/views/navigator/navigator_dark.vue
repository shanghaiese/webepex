<template>
	<div class="stickyWrapper">
		<div class="container clearFixed">
			<div class="fixed">
				<ul class="nav_left">
					<li @click="goToHomepage()" :class="{'active':menuIndex==='homePage'}">首页</li>
					<li @click="goToKangyang()" :class="{'active':menuIndex==='kangyang'}">康养公寓</li>
					<li @click="goToAboutUs()" :class="{'active':menuIndex==='aboutUs'}">关于我们</li>
				</ul>
				<ul class="nav_right">
					<li class="right_item">
						<el-autocomplete
							class="inline-input"
							v-model="state1"
							:fetch-suggestions="querySearch"
							placeholder="请输入内容"
							@select="handleSelect"
							prefix-icon="el-icon-search"
						></el-autocomplete>
					</li>
					<li class="right_item clearFixed">
						<div v-show="false" class="unlogin_status clearFixed">
							<div class="register" @click="goToRegister">
								<i class="el-icon-user" style="margin-right:8px;"></i>注册
							</div>
							<div class="login" @click="goToLogin">
								<i class="el-icon-chat-line-round" style="margin-right:8px;"></i>登录
							</div>
						</div>
						<div
							v-show="true"
							class="login_status"
							@mouseenter="showDropmenu=true"
							@mouseleave="showDropmenu=false"
						>
							<span class="el-dropdown-link">
								<i class="el-icon-user"></i>
								15533334445
							</span>
							<transition name="fade">
								<div class="dropmenu" v-show="showDropmenu">
									<ul v-for="(item,key) in loginMenu" :key="key">
                                        <li v-for="(menu,k) in item" :key="k" @click="gotoInnerPage(menu)">{{menu.label}}</li>
                                    </ul>
								</div>
							</transition>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<router-view></router-view>
		<vfooter/>
	</div>
</template>

<script type="text/ecmascript-6">
import vfooter from "@/components/footer/footer";
import dealMenu from "@/utils/dealMenu";
export default {
	data() {
		return {
			restaurants: [
				{ value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
				{
					value: "Hot honey 首尔炸鸡（仙霞路）",
					address: "上海市长宁区淞虹路661号"
				},
				{
					value: "新旺角茶餐厅",
					address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
				}
			],
			state1: "",
			showDropmenu: false,
            loginMenu:[
                [
                    {
						label:"切换为运营商",
						index:null,
						islink:false
                    },
                    {
						label:"切换为企业家",
						index:null,
						islink:false
                    }
                ],
                [
                    {
						label:"我的资料",
						index:"/enterpriseQualifing",
						islink:true,
						menuIndex: "enterpriseQualifing"
                    }
                ],
                [
                    {
						label:"康养公寓项目",
						index:"/projectList",
						islink:true,
						menuIndex: "projectList"
                    },
                    {
						label:"我的转让",
						index:"/myTransfer",
						islink:true,
						menuIndex: "myTransfer"
                    },
                    {
						label:"我的购买",
						index:"/myPurchase",
						islink:true,
						menuIndex:"myPurchase"
                    }
                ],
                [
                    {
						label:"退出",
						islink:true,
						menuIndex:"login",
						index:"/login"
                    }
                ]
            ]
		};
	},
	methods: {
		goToHomepage() {
            if(this.menuIndex==="homePage"){return;}
			this.$router.push("/homePage");
		},
		goToKangyang() {
            if(this.menuIndex==="kangyang"){return;}
			this.$router.push("/kangyang");
		},
		goToAboutUs() {
            if(this.menuIndex==="aboutUs"){return;}
			this.$router.push("/aboutUs");
		},
		// --------------------------------搜索下拉部分
		querySearch(queryString, cb) {
			var restaurants = this.restaurants;
			var results = queryString
				? restaurants.filter(this.createFilter(queryString))
				: restaurants;
			// 调用 callback 返回建议列表的数据
			cb(results);
		},
		createFilter(queryString) {
			return restaurant => {
				return (
					restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
					0
				);
			};
		},
		handleSelect(item) {
			console.log(item);
		},
		//----------------------------------跳转到注册页
		goToRegister() {
			this.$router.push("/registerPersonal");
		},
		//----------------------------------跳转到登录页
		goToLogin() {
			this.$router.push("/login");
		},
		// --------------------------------跳转至内页
		gotoInnerPage(item) {
			// console.log(dealMenu);
			this.showDropmenu = false;
			// if(this.menuIndex===item.menuIndex) {return;}
			// console.log(this.menuIndex);
            dealMenu(item);
            console.log('a');
		}
	},
	components: {
		vfooter
    },
	computed:{
		menuIndex() {
			let index = this.$store.state.states.menuIndex; 
			return index;
		}
	}
};
</script>

<style lang="less" scoped>
.stickyWrapper{
	min-height: 100vh;
	box-sizing: border-box;
	padding-bottom: 72px;
	position: relative;
}
.container {
	height: 70px;
	background: rgba(49, 52, 67, 1);
	opacity: 0.92;
	position: relative;
	z-index: 100;
	.fixed {
		width: 1200px;
		margin: 0 auto;
		background-image: url(./../../assets/img/nav_logo_light.png);
		background-repeat: no-repeat;
		background-position: 0 center;
		background-size: 112px 30px;
		// background:red;
		padding-left: 220px;
		box-sizing: border-box;
		.nav_left {
			float: left;
			color: white;
			height: 70px;
			line-height: 70px;
			li {
				float: left;
				&:hover {
					color: #caa14f;
					cursor: pointer;
				}
			}
			li + li {
				margin-left: 56px;
            }
            .active {
                color: #caa14f;
            }
		}
		.nav_right {
			float: right;
			color: white;
			height: 70px;
			.right_item {
				float: left;
				line-height: 70px;
				height: 70px;
				/deep/.el-input__inner {
					background: transparent;
					border: none;
					border-bottom: 1px solid rgba(255, 255, 255, 0.1);
					border-radius: 0;
					color: white;
				}
				.unlogin_status {
					div {
						float: left;
						&:hover {
							color: #caa14f;
							cursor: pointer;
						}
					}
					.login {
						margin-left: 30px;
					}
				}
				.login_status {
					float: left;
					color: white;
					height: 70px;
					padding: 0 8px;
					position: relative;
					z-index: 1000;
					&:hover {
						background: #caa14f;
					}
					.dropmenu {
						position: absolute;
						z-index: 1000;
						color: black;
						top: 70px;
						right: 0;
						width: 200px;
						background: #ffffff;
                        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
						ul {
                            padding:7px 0;
                            border-bottom: #E8E8E8 1px solid;
                            li{
                                padding: 9px 0 9px 16px;
                                line-height: 1;
                                color: #333333;
                                font-size: 14px;
                                &:hover{
                                    background:#F5F5F5;
                                }
                            }
                        }
                        ul:last-child{
                            border-bottom: #E8E8E8 0px solid;
                        }
					}
					.fade-enter-active,
					.fade-leave-active {
						transition: opacity 0.5s;
					}
					.fade-enter,
					.fade-leave-active {
						opacity: 0;
					}
				}
			}
			.right_item + .right_item {
				margin-left: 30px;
			}
		}
	}
}
</style>
