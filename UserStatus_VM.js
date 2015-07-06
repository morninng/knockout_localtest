
function user_status_VM(role_name){
  var self = this;
  self.role_name = role_name;
  self.role = ko.observable();
  self.user_name = ko.observable("no applicant");
  self.pict_src = ko.observable("./picture/1.jpg");
  self.user_status_css = ko.observable("notapplicant");
  self.parse_id = ko.observable(null);
  self.enable_change = ko.observable(true);

  self.decline_visible = ko.observable(false);
  self.join_visible = ko.observable(false);
  self.cancel_visible = ko.observable(false);
  
}


user_status_VM.prototype.update_user_status = function(){

	var self = this;
	self.update_user_info(self.role_name);
	self.update_user_login_status(self.role_name);
	self.update_button_byGamestatus();
	self.update_button_status(self.role_name);
}

user_status_VM.prototype.update_user_info = function(role_name){
	var self = this;

	var isAudience = appmgr.participant_manager_object.is_Audience(role_name);
	if(!isAudience){
		var show_role_name = self.convert_role_name(role_name);
		self.role(show_role_name);
	}

	var parse_id = appmgr.participant_manager_object.getParseID_fromRole(role_name);
	self.parse_id(parse_id);
	if(parse_id == null){
		return ;
	}

	var name = appmgr.participant_manager_object.getUserFirstName(role_name);
	var pict_src = appmgr.participant_manager_object.getUserPictureSrc(role_name);
	self.user_name(name);
	self.pict_src(pict_src);
}

user_status_VM.prototype.update_user_login_status = function(role_name){

	var self = this;
	var login_status = appmgr.participant_manager_object.getLoginStatus(role_name);
	switch(login_status){
	  case 'login':
	    self.user_status_css("login");
	  break;
	  case 'logout':
	    self.user_status_css("logout");
	  break;
	  case 'no_applicant':
	    self.user_status_css("no_applicant");
	  break;
	}
}

user_status_VM.prototype.update_button_status = function(role_name){
	var self = this;
	var parse_id = appmgr.participant_manager_object.getParseID_fromRole(role_name);
	var is_login = appmgr.participant_manager_object.is_Login(role_name);
	var is_own_group = appmgr.participant_manager_object.is_OwnGroup(role_name);
	var is_my_role = appmgr.participant_manager_object.is_OwnRole(role_name);
	var is_audience = appmgr.participant_manager_object.is_Audience(role_name);
	var is_audience_yourself = appmgr.participant_manager_object.isAudience_yourself();

	if(is_audience){
      self.cancel_visible(false);
      self.join_visible(false);
      self.decline_visible(false);

	}else{
		if(parse_id){
			if(is_login){
				if(is_my_role){
					self.cancel_visible(true);
          			self.join_visible(false);
          			self.decline_visible(false);
				}else{
					self.cancel_visible(false);
          			self.join_visible(false);
          			self.decline_visible(false);
				}
			}else{
				self.cancel_visible(false);
          		self.join_visible(false);
          		self.decline_visible(true);
			}
		}else{
			if(is_audience_yourself){
				self.cancel_visible(false);
          		self.join_visible(true);
          		self.decline_visible(false);
			}else{
				if(is_own_group){
					self.cancel_visible(false);
          			self.join_visible(true);
          			self.decline_visible(false);
				}else{
					self.cancel_visible(false);
          			self.join_visible(false);
          			self.decline_visible(false);
				}
			}
		}
	}
}



user_status_VM.prototype.update_button_byGamestatus = function(){

	var self = this;
	var game_status = appmgr.game_status;
	switch(game_status){
		case 1:
		case 2:
		case 3:
			self.enable_change(true);
		break;
		case 4:
		case 5:
			self.enable_change(false);
		break;
	}
}

user_status_VM.prototype.convert_role_name = function(role_name){

var convert_table = {
	PrimeMinister:"PM",
	LeaderOpposition:"LO",
	MemberGovernment:"MG",
	MemberOpposition:"MO",
	ReplyPM:"RPM",
	LOReply:"LOR",
	DeptyPrimeMinister:"DPM",
	DeptyLeaderOpposition:"DLO",
	GovernmentWhip:"GW",
	OppositionWhip:"OW",
	GovermentReply:"GR",
	OppositionReply:"OR"
 }
 return convert_table[role_name];

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
	/*
	var isAudience = appmgr.participant_manager_object.is_Audience(self.role_name);
	if(isAudience){
		self.cancel_audience_from_hangout();
	}else{
		self.cancel_debater_from_hangout();
	}
	*/
}


user_status_VM.prototype.cancel_debater_from_hangout = function(){

/*
  var cancel_obj = { game_id: debate_game_id, game_role:, own_user_id: ,own_user_key: };
 
  Parse.Cloud.run('Cloud_Hangout_cancel_debater', cancel_obj,{
    success: function(game_obj) {
    	// update hangout status, participant_role_count ++;
    },
    error: function(error) {
      alert( error.message);
    }
  });
*/
}

user_status_VM.prototype.cancel_audience_from_hangout = function(){
/*
  var cancel_obj = { game_id: debate_game_id, own_user_id: ,own_user_key: };
 
  Parse.Cloud.run('Cloud_Hangout_cancel_debater', cancel_obj,{
    success: function(game_obj) {
    	// update hangout status, participant_role_count ++;
    },
    error: function(error) {
      alert( error.message);
    }
  });
*/
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

