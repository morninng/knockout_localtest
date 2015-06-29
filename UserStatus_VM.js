
function user_status_VM(){
  var self = this;
  self.role = ko.observable();
  self.user_name = ko.observable("no one applied");
  self.pict_src = ko.observable("./picture/1.jpg");
  self.user_status_css = ko.observable("notapplicant");
  self.parse_id = ko.observable(null);
  self.enable_change = ko.observable(true);
  self.decline_visible = ko.observable(false);
  self.join_visible = ko.observable(false);
  
}

user_status_VM.prototype.set_name = function(in_name){

	var self = this;
	self.user_name(in_name);
}

user_status_VM.prototype.set_role_name = function(in_role){

	var self = this;
	self.role(in_role);
}

user_status_VM.prototype.set_login_status = function(login_status){

	var self = this;
	switch(login_status){
	  case 'login':
	    self.user_status_css("login");
	  break;
	  case 'logout':
	    self.user_status_css("logout");
	  break;
	  case 'no_applicant':
	    self.user_status_css("notapplicant");
	  break;
	}
}

user_status_VM.prototype.set_parse_id = function(parse_id){

	var self = this;
	self.parse_id(parse_id);
}

user_status_VM.prototype.set_pict_src = function(src){

	var self = this;
	self.pict_src(src);
}

user_status_VM.prototype.set_decline_visible = function(status){

	var self = this;
	self.decline_visible(status);
}


user_status_VM.prototype.set_join_visible = function(status){

	var self = this;
	self.join_visible(status);
}



user_status_VM.prototype.decline = function(data, event){
  
	var self = this;
	console.log(data.parse_id());
	self.set_login_status("logout");
}

user_status_VM.prototype.join = function(data, event){

	var self = this;
	// Parse_Cloud.join(own_parse_id, role_name, game_id);
	console.log(data.enable_change());
	self.set_login_status("no_applicant");
  
}

user_status_VM.prototype.cancel = function(){
	

}

user_status_VM.prototype.enable_user_participant_change = function(status){
  
	var self = this;
	self.enable_change(status);
// statusがPreparation前になったときに、Joinボタンおよびdeclineボタンを表示
// 　→ユーザ設定がありで未ログイン
// 　　　→Declineボタンを表示
// 　→ユーザ設定なしで、同一チームのロールか、Audienceのとき
// 　　　→Joinボタンを表示  
  
}

