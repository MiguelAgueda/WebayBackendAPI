webpackJsonp([1],{C1tQ:function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),n=(a("Jmt5"),a("Tqaz")),r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var i=a("VU/8")(null,r,!1,function(t){a("C1tQ")},null,null).exports,o=a("/ocq"),u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"Home"},[a("link",{attrs:{rel:"shortcut icon",href:"{{ url_for('static', filename='favicon.ico') }}"}}),t._v(" "),a("div",{staticClass:"col-mb-4 md-4"},[a("h1",[t._v(t._s(t.msg))]),t._v(" "),a("a",{attrs:{href:"/signup",target:"_self",rel:"noopener"}},[t._v(" Sign Up ")]),t._v(" "),a("a",{attrs:{href:"/login",target:"_self",rel:"noopener"}},[t._v(" Login ")])])])},staticRenderFns:[]},l=a("VU/8")({name:"Home",data:function(){return{msg:this.setMsg(),messageToUsers:"Welcome to Webay"}},methods:{setMsg:function(){return this.messageToUsers="Welcome to Webay",this.$root.authenticated&&(this.messageToUsers+=", "+this.$root.loggedInAs),this.messageToUsers}}},u,!1,null,null,null).exports,d=a("mtWM").default,c={name:"SignUp",computed:{validationTooltipUsername:function(){return this.userData.username.length>0},validationTooltipPassword:function(){return this.userData.password.length>0},submitState:function(){return this.userData.username.length>0&&this.userData.password.length>0}},data:function(){return{userData:{username:"",password:""}}},methods:{initForm:function(){this.userData.username="",this.userData.password="",this.userData.valid=!1},postUserData:function(t){var e=this;d.post("/api/signup",t).then(function(t){"true"===t.data.valid&&e.$router.replace({name:"Home"})})},onSubmit:function(t){if(t.preventDefault(),this.userData.username.length>0&&this.userData.password.length>0){var e={username:this.userData.username,password:this.userData.password};this.initForm(),this.postUserData(e)}}},created:function(){}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{staticClass:"need-validation",attrs:{novalidate:""}},[a("h1",[t._v("Welcome! Let's get you set up with an account")]),t._v(" "),a("div",{staticClass:"form-group row"},[a("div",{staticClass:"col-md-2 mb-3"},[a("div",{staticClass:"input-group"},[t._m(0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.username,expression:"userData.username"}],staticClass:"form-control",attrs:{type:"text",id:"validationTooltipUsername","aria-describedby":"validationTooltipUsernamePrepend",placeholder:"Username",required:""},domProps:{value:t.userData.username},on:{input:function(e){e.target.composing||t.$set(t.userData,"username",e.target.value)}}}),t._v(" "),a("div",{staticClass:"invalid-tooltip"},[t._v("\n          Please choose a unique and valid username.\n        ")])])]),t._v(" "),a("div",{staticClass:"col-md-3 mb-3"},[a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.password,expression:"userData.password"}],staticClass:"form-control",attrs:{type:"password",id:"validationTooltipPassword",placeholder:"Password",required:""},domProps:{value:t.userData.password},on:{input:function(e){e.target.composing||t.$set(t.userData,"password",e.target.value)}}}),t._v(" "),a("div",{staticClass:"invalid-tooltip"},[t._v("\n          Please choose a password.\n        ")])])]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3",attrs:{for:"submitButton"}},[a("b-button",{attrs:{variant:"primary"},on:{click:t.onSubmit}},[t._v("Join")])],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text",attrs:{id:"validationTooltipUsername","aria-describedby":"validationTooltipUsernamePrepend"}},[this._v("@")])])}]},p=a("VU/8")(c,m,!1,null,null,null).exports,v=a("mtWM").default,h={name:"Login",data:function(){return{userData:{username:"",password:""},invalidLoginAttempt:!1,invalidInput:!1}},methods:{initForm:function(){this.userData.username="",this.userData.password="",this.userData.valid=!1},userLogin:function(t){var e=this;v.post("/api/login",t).then(function(a){console.log(a),"true"===a.data.valid?(console.log("User authenticated."),e.$root.authenticated=!0,e.$root.loggedInAs=t.username,e.$router.replace({name:"Home"})):e.invalidLoginAttempt=!0})},onSubmit:function(t){if(t.preventDefault(),this.userData.username.length>0&&this.userData.password.length>0){var e={username:this.userData.username,password:this.userData.password};this.userLogin(e)}else console.log("Got Here!")}},created:function(){}},g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{role:"group"}},[a("h1",[t._v("Welcome Back! Let's get you logged in.")]),t._v(" "),t._m(0),t._v(" "),a("b-form-input",{attrs:{id:"username-input",trim:""},model:{value:t.userData.username,callback:function(e){t.$set(t.userData,"username",e)},expression:"userData.username"}}),t._v(" "),a("b-form-group",{attrs:{id:"password_input_group"}},[a("label",{attrs:{for:"password-input"}},[a("h6",[t._v("Password:")])]),t._v(" "),a("b-form-input",{attrs:{id:"password-input",type:"password",trim:""},model:{value:t.userData.password,callback:function(e){t.$set(t.userData,"password",e)},expression:"userData.password"}})],1),t._v(" "),a("b-alert",{attrs:{show:t.invalidLoginAttempt,variant:"danger"}},[t._v("\n    Username or password are incorrect. Did you mean to\n    "),a("a",{attrs:{href:"/signup"}},[a("strong",[t._v("sign up")])]),t._v("\n    instead?\n  ")]),t._v(" "),a("b-alert",{attrs:{show:t.invalidInput,variant:"warning"}},[t._v("\n    Please fill out username and password fields.\n  ")]),t._v(" "),a("b-form-group",[a("b-button",{attrs:{variant:"primary"},on:{click:t.onSubmit}},[t._v("Submit")])],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("label",{attrs:{for:"username-input"}},[e("h6",[this._v("Username:")])])}]},f=a("VU/8")(h,g,!1,null,null,null).exports,_=a("mtWM").default,w={name:"Ping",data:function(){return{msg:""}},methods:{getMessage:function(){var t=this;_.get("/api/ping").then(function(e){t.msg=e.data}).catch(function(t){console.log("Error in Pinging."),console.error(t)})}},created:function(){this.getMessage()}},b={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"button"}},[this._v(this._s(this.msg))])])},staticRenderFns:[]},D=a("VU/8")(w,b,!1,null,null,null).exports;s.default.use(o.a);var U=[{path:"/",name:"Home",component:l},{path:"/signup",name:"SignUp",component:p},{path:"/login",name:"Login",component:f},{path:"/ping",name:"Ping",component:D}],C=new o.a({mode:"history",base:Object({NODE_ENV:"production"}).BASE_URL,routes:U});s.default.config.productionTip=!1,s.default.use(n.a),s.default.use(n.b),new s.default({router:C,render:function(t){return t(i)},data:{authenticated:!1,loggedInAs:"",msg:""}}).$mount("#app")}},["NHnr"]);
//# sourceMappingURL=app.dde647ab2e5cf1334901.js.map