webpackJsonp([1],{C1tQ:function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("7+uW"),a=(n("Jmt5"),n("Tqaz")),r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var o=n("VU/8")(null,r,!1,function(t){n("C1tQ")},null,null).exports,i=n("/ocq"),u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"text-left"},[n("b-row",[n("b-col",{attrs:{sm:"6"}},[n("h1",[t._v(t._s(t.msg))])]),t._v(" "),n("b-col",{staticClass:"mt-2",attrs:{sm:"6"}},[n("b-button",{attrs:{href:"/listings",target:"_self",variant:"dark"}},[t._v("Listings")]),t._v(" "),n("b-button",{attrs:{href:"/forum",target:"_self",variant:"dark"}},[t._v("Forum")]),t._v(" "),n("b-button",{attrs:{href:"/signup",target:"_self",variant:"warning"}},[t._v(" Sign Up ")]),t._v(" "),n("b-button",{attrs:{href:"/login",target:"_self",variant:"primary"}},[t._v(" Log In ")])],1)],1)],1)},staticRenderFns:[]},l=n("VU/8")({name:"Home",data:function(){return{msg:this.setMsg(),messageToUsers:"Welcome to Webay"}},methods:{setMsg:function(){return this.messageToUsers="Welcome to Webay",this.$root.authenticated&&(this.messageToUsers+=", "+this.$root.loggedInAs),this.messageToUsers}}},u,!1,null,null,null).exports,c=n("mtWM").default,p={name:"SignUp",computed:{validationTooltipUsername:function(){return this.userData.username.length>0},validationTooltipPassword:function(){return this.userData.password.length>0},submitState:function(){return this.userData.username.length>0&&this.userData.password.length>0}},data:function(){return{userData:{username:"",password:""}}},methods:{initForm:function(){this.userData.username="",this.userData.password="",this.userData.valid=!1},postUserData:function(t){var e=this;c.post("/api/signup",t).then(function(t){"true"===t.data.valid&&e.$router.replace({name:"Home"})})},onSubmit:function(t){if(t.preventDefault(),this.userData.username.length>0&&this.userData.password.length>0){var e={username:this.userData.username,password:this.userData.password};this.initForm(),this.postUserData(e)}}},created:function(){}},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"text-left"},[n("div",{attrs:{role:"group"}},[n("h1",[t._v("Let's get you set up with an account")]),t._v(" "),n("label",{attrs:{for:"username-input"}},[n("h6",[t._v("Username:")])]),t._v(" "),n("b-form-input",{attrs:{id:"username-input",trim:""},model:{value:t.userData.username,callback:function(e){t.$set(t.userData,"username",e)},expression:"userData.username"}}),t._v(" "),n("b-form-group",{attrs:{id:"password_input_group"}},[n("label",{attrs:{for:"password-input"}},[n("h6",[t._v("Password:")])]),t._v(" "),n("b-form-input",{attrs:{id:"password-input",type:"password",trim:""},model:{value:t.userData.password,callback:function(e){t.$set(t.userData,"password",e)},expression:"userData.password"}})],1),t._v(" "),n("b-alert",{attrs:{show:t.invalidLoginAttempt,variant:"danger"}},[t._v("\n      Username or password are incorrect. Did you mean to\n      "),n("a",{attrs:{href:"/signup"}},[n("strong",[t._v("sign up")])]),t._v("\n      instead?\n    ")]),t._v(" "),n("b-alert",{attrs:{show:t.invalidInput,variant:"warning"}},[t._v("\n      Please fill out username and password fields.\n    ")]),t._v(" "),n("b-form-group",[n("b-button",{attrs:{variant:"warning"},on:{click:t.onSubmit}},[t._v("Sign Up")])],1)],1)])},staticRenderFns:[]},m=n("VU/8")(p,d,!1,null,null,null).exports,h=n("mtWM").default,f={name:"Login",data:function(){return{userData:{username:"",password:""},invalidLoginAttempt:!1,invalidInput:!1}},methods:{initForm:function(){this.userData.username="",this.userData.password="",this.userData.valid=!1},userLogin:function(t){var e=this;h.post("/api/login",t).then(function(n){console.log(n),"true"===n.data.valid?(console.log("User authenticated."),e.$root.authenticated=!0,e.$root.loggedInAs=t.username,e.$router.replace({name:"Home"})):e.invalidLoginAttempt=!0})},onSubmit:function(t){if(t.preventDefault(),this.userData.username.length>0&&this.userData.password.length>0){var e={username:this.userData.username,password:this.userData.password};this.userLogin(e)}else console.log("Got Here!")}},created:function(){}},g={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"text-left"},[n("div",{attrs:{role:"group"}},[n("h1",[t._v("Welcome Back! Let's get you logged in.")]),t._v(" "),n("label",{attrs:{for:"username-input"}},[n("h6",[t._v("Username:")])]),t._v(" "),n("b-form-input",{attrs:{id:"username-input",trim:""},model:{value:t.userData.username,callback:function(e){t.$set(t.userData,"username",e)},expression:"userData.username"}}),t._v(" "),n("b-form-group",{attrs:{id:"password_input_group"}},[n("label",{attrs:{for:"password-input"}},[n("h6",[t._v("Password:")])]),t._v(" "),n("b-form-input",{attrs:{id:"password-input",type:"password",trim:""},model:{value:t.userData.password,callback:function(e){t.$set(t.userData,"password",e)},expression:"userData.password"}})],1),t._v(" "),n("b-alert",{attrs:{show:t.invalidLoginAttempt,variant:"danger"}},[t._v("\n      Username or password are incorrect. Did you mean to\n      "),n("a",{attrs:{href:"/signup"}},[n("strong",[t._v("sign up")])]),t._v("\n      instead?\n    ")]),t._v(" "),n("b-alert",{attrs:{show:t.invalidInput,variant:"warning"}},[t._v("\n      Please fill out username and password fields.\n    ")]),t._v(" "),n("b-form-group",[n("b-button",{attrs:{variant:"primary"},on:{click:t.onSubmit}},[t._v("Log In")])],1)],1)])},staticRenderFns:[]},v=n("VU/8")(f,g,!1,null,null,null).exports,_=n("mtWM").default,b={name:"Ping",data:function(){return{msg:""}},methods:{getMessage:function(){var t=this;_.get("/api/ping").then(function(e){t.msg=e.data}).catch(function(t){console.log("Error in Pinging."),console.error(t)})}},created:function(){this.getMessage()}},w={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"button"}},[this._v(this._s(this.msg))])])},staticRenderFns:[]},D=n("VU/8")(b,w,!1,null,null,null).exports,y=n("mtWM"),U=n.n(y),x={name:"Forum",props:["label","nodes","depth"],computed:{indent:function(){return{transform:"translate("+50*this.depth+"px)"}}},data:function(){return{rows:this.getForumPosts()}},methods:{getForumPosts:function(){return[{postid:0,user:"Vel",title:"What's an oatmeal?",content:"I need to know",replies:[{replyid:0,user:"Vel",content:"And why is it so thicc"},{replyid:1,user:"Vel",content:"Seriously, i need to know"}]}]},formatForum:function(){var t=[],e=this.getForumPosts();for(post_i=0;post_i<e.length;post_i++){e[post_i];t.push(row)}return t}}},k={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"text-left"},t._l(t.rows,function(e){return n("b-row",{key:e.postid},[n("b-card",[n("b-card-title",[t._v(" "+t._s(e.title)+" ")]),t._v(" "),n("b-card-text",[t._v(" "+t._s(e.user)+": "+t._s(e.content)+" ")]),t._v(" "),t._l(e.replies,function(e){return n("b-row",{key:e.postid},[n("b-card",[n("b-card-text",[t._v(" "+t._s(e.user)+": "+t._s(e.content)+" ")])],1)],1)})],2)],1)}),1)},staticRenderFns:[]},L=n("VU/8")(x,k,!1,null,null,null).exports,$={name:"Listings",data:function(){return{rows:this.getAlphabetRows()}},methods:{playSound:function(t){new Audio(t).play()},getListings:function(){U.a.get("/api/listings").then(function(t){return t})},formatListings:function(){for(var t=[],e=(this.getListings(),0);e<alphabet.length;e+=itemsPerRow){for(var n=[],s=0;s<itemsPerRow;s+=1)e+s<alphabet.length&&n.push(alphabet[e+s]);t.push(n)}return t}}},F={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"text-center"},[n("h1",{staticClass:"pt-2"},[t._v("Let's make some noise!")]),t._v(" "),n("h3",{staticClass:"pb-4"},[t._v("Press on a button to hear the sound")]),t._v(" "),t._l(t.rows,function(e){return n("b-row",{key:e[0].letter},t._l(e,function(e){return n("b-card-group",{key:e.letter,staticClass:" pb-4 mx-auto",attrs:{deck:""}},[n("b-card",{staticStyle:{"max-width":"15rem"},attrs:{"img-top":"","img-src":e.image}},[n("b-card-title",[n("b-button",{attrs:{href:"#",variant:"success"},on:{click:function(n){return n.preventDefault(),t.playSound(e.sound)}}},[n("H2",[t._v(t._s(e.letter))])],1)],1)],1)],1)}),1)})],2)},staticRenderFns:[]},P=n("VU/8")($,F,!1,null,null,null).exports;s.default.use(i.a);var S=[{path:"/",name:"Home",component:l},{path:"/signup",name:"SignUp",component:m},{path:"/login",name:"Login",component:v},{path:"/ping",name:"Ping",component:D},{path:"/forum",component:L},{path:"/listings",component:P}],C=new i.a({mode:"history",base:Object({NODE_ENV:"production"}).BASE_URL,routes:S});s.default.config.productionTip=!1,s.default.use(a.a),s.default.use(a.b),new s.default({router:C,render:function(t){return t(o)},data:{authenticated:!1,loggedInAs:"",msg:""}}).$mount("#app")}},["NHnr"]);
//# sourceMappingURL=app.06b1ecb871842073f943.js.map