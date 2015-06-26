
function ParticipantMgr(game_obj, parse_user_id, hangout_id){

	var self = this;
	self.debater_obj_array = game_obj.debater_data_array;
	self.audience_obj_array = game_obj.audience_data_array;
	self.game_style = game_obj.game_style;
	self.own_parse_id = parse_user_id;
	self.own_hangout_id = hangout_id;
	self.parse_hangout_idmapping_array = new Object();
	
	self.initialize(self.game_style);
}

//participant changed eventが呼ばれたときに、毎回呼び出す。

ParticipantMgr.prototype.update_participants = function(){

	var self = this;
	self.participant_id_array = ["hangout_XXX1", "hangout_XXX2"];
	
	// ここは、こっちが正しいが、hangout上しかできないのであとで入れ替える
	// var participant_object_array = getparticipants();
	//for(var i=0; i<  participant_object_array; i++){
	//	self.participant_id_array.push(participant_object_array[i].id);
	//}

}


ParticipantMgr.prototype.set_parseid_hangoutid_mapping = function(parse_hangout_mapping){
	
	self.parse_hangout_idmapping_array = parse_hangout_mapping;
}



ParticipantMgr.prototype.refresh_serverdata = function(game_id){
	
}



ParticipantMgr.prototype.initialize = function(){

	var self = this;
	var game_style = self.game_style;
	
	switch(game_style){
	  case 'NorthAmerica':
		self.role_array = ["PrimeMinister","LeaderOpposition","MemberGovernment","MemberOpposition","ReplyPM","LOReply"];
		self.role_group_array = {PrimeMinister:"Gov",LeaderOpposition:"Opp",MemberGovernment:"Gov",MemberOpposition:"Opp",ReplyPM:"Gov",LOReply:"Opp"};
		break;
	  case 'Asian':
	  	self.role_array = ["PrimeMinister","LeaderOpposition","DeptyPrimeMinister","DeptyLeaderOpposition",
                      "GovernmentWhip","OppositionWhip","GovermentReply","OppositionReply"];
		self.role_group_array = {PrimeMinister:"Gov",LeaderOpposition:"Opp",DeptyPrimeMinister:"Gov",DeptyLeaderOpposition:"Opp",GovernmentWhip:"Gov",OppositionWhip:"Opp",ReplyPM:"Gov",LOReply:"Opp"};
		break;
	  case 'BP':
	  	self.role_array = ["PrimeMinister","LeaderOpposition","DeptyPrimeMinister","DeptyLeaderOpposition",
                      "MemberGovernment","MemberOpposition","GovermentWhip","OppositionWhip"];
		self.role_group_array = {PrimeMinister:"OG",LeaderOpposition:"OO",DeptyPrimeMinister:"OG",DeptyLeaderOpposition:"OO",MemberGovernment:"CG",MemberOpposition:"CO",GovermentWhip:"CG",OppositionWhip:"CO"};
		break;
	}
}


ParticipantMgr.prototype.get_all_rolename_array = function(){
  var self = this;
  return self.role_array;
}


ParticipantMgr.prototype.get_role_array = function(hangout_id){

	var self = this;

	var parse_id = self.getParseID(hangout_id);
	var role_array = new Array();

	for(var i=0; i< self.debater_obj_array.length; i++){
	  if(self.debater_obj_array[i].parse_id == parse_id){
	    role_array.push(self.debater_obj_array[i].role)
	  }
	}
	for(key in self.audience_obj_array){
	  if(self.audience_obj_array[key].parse_id == parse_id){
	    role_array.push(self.audience_obj_array[key].role)
	  }
	}
	
	return role_array;

}

ParticipantMgr.prototype.get_own_role_array = function(){

	var self = this;
	var role_array = new Array();
	
	role_array = self.get_role_array(self.own_hangout_id);
	return role_array;
}


ParticipantMgr.prototype.getParseID = function(hangout_id){

	var parse_id = null;
	
	for(var i=0; i< self.parse_hangout_idmapping_array.length; i++){
		if(self.parse_hangout_idmapping_array[i].hangout_id == hangout_id){
		  parse_id = self.parse_hangout_idmapping_array[i].parse_id;
		}
	}
	return parse_id;

}

ParticipantMgr.prototype.getRoleGroup = function(role_name){

	var self = this;
	role_group_name = self.role_group_array[role_name];
	return role_group_name;
}


ParticipantMgr.prototype.isYourPartner = function(hangout_id){

	var self = this;
	own_role_array = new Array();
	own_role_array = self.get_own_role_array();
	others_role_array = new Array();
	others_role_array = self.get_role_array(hangout_id);
	
	own_group = self.getRoleGroup(own_role_array[0]);
	others_group = self.getRoleGroup(others_role_array[0]);
	
	if(own_group == others_group){
		return true
	}
	return false;
	//ロールを取得で比較	
}


ParticipantMgr.prototype.isAudience_yourself = function(){

	var self = this;
	var parse_id = self.getParseID();

	for(key in self.audience_obj_array){
	  if(self.audience_obj_array[key].parse_id == parse_id){
	    return true;
	  }
	}
	return false;
}


ParticipantMgr.prototype.isDebater_yourself = function(){	


	var self = this;
	var parse_id = self.getParseID();

	for(var i=0; i< self.debater_obj_array.length; i++){
	  if(self.debater_obj_array[i].parse_id == parse_id){
	  	return true;
	  }
	}
	return false;	
}

ParticipantMgr.prototype.getUserPictureSrc = function(role_name){

	var self = this;
	for(var i=0; i< self.debater_obj_array.length; i++){
	  if(self.debater_obj_array[i].role == role_name){
	    return self.debater_obj_array[i].pict_src;
	  }
	}
	for(var i=0; i <self.audience_obj_array.length; i++){
	  if(self.audience_obj_array[i].role == role_name){
	    return self.audience_obj_array[i].pict_src;
	  }
	}
	return null;
}

ParticipantMgr.prototype.getUserFirstName = function(role_name){

	var self = this;
	for(var i=0; i< self.debater_obj_array.length; i++){
	  if(self.debater_obj_array[i].role == role_name){
	    return self.debater_obj_array[i].first_name;
	  }
	}
	for(var i=0; i <self.audience_obj_array.length; i++){
	  if(self.audience_obj_array[i].role == role_name){
	    return self.audience_obj_array[i].first_name;
	  }
	}
	return null;
}



ParticipantMgr.prototype.getUserFullName = function(role_name){

	var self = this;
	for(var i=0; i< self.debater_obj_array.length; i++){
	  if(self.debater_obj_array[i].role == role_name){
	    return self.debater_obj_array[i].first_name + self.debater_obj_array[i].last_name;
	  }
	}
	for(var i=0; i <self.audience_obj_array.length; i++){
	  if(self.audience_obj_array[i].role == role_name){
	    return self.debater_obj_array[i].first_name + self.debater_obj_array[i].last_name;
	  }
	}
	return null;
}




ParticipantMgr.prototype.checkExistence = function(hangout_id){

	var self = this;
	for(var i=0; i<self.participant_id_array.length; i++){
		if(participant_id_array[i]==hangout_id){
			return true
		}
	}
	return false;
}



 // Init時に加え だれかが、Join ボタンやCancelボタンを押したときに、サーバデータをアップデート
ParticipantMgr.prototype.updateServerData = function(){
	
}


ParticipantMgr.prototype.getGameType = function(){

}



