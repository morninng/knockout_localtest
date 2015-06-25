


function ParticipantTableVM(){
	var self = this;
	
	var game_style = "NA";
	
	self.CreateTableTemplate(game_style);
	self.create_rolename_array(game_style);	
	for(var i = 0; i< self.role_array.length; i++){
		self.CreateUserObj(self.role_array[i], self.container_array[i]);
		self.UserObj_setData(self.role_array[i]);
	}
}

ParticipantTableVM.prototype.CreateUserObj = function(role_name, container_name){

	var self = this;
	eval("self.user_obj_" + role_name + " = new user_status_view();" );
	eval("ko.applyBindings( self.user_obj_" + role_name + " , document.getElementById('" + container_name + "'));" );
}

ParticipantTableVM.prototype.UserObj_setData = function(role_name){

	var self = this;
	var name = "Yuta";
	var login_status = "login";
	var parse_id = "XXXX";
	var pict_src = "./download.jpg";
	var decline_status = true;
	var join_status = true;
	var enable_change_status = true;
	
	
	
	eval("self.user_obj_" + role_name + ".set_name('" + name + "');" );
	eval("self.user_obj_" + role_name + ".set_role_name('" + role_name + "');" );
	eval("self.user_obj_" + role_name + ".set_login_status('" + login_status + "');" );
	eval("self.user_obj_" + role_name + ".set_parse_id('" + parse_id + "');" );
	eval("self.user_obj_" + role_name + ".set_pict_src('" + pict_src + "');" );
	eval("self.user_obj_" + role_name + ".set_decline_visible(" + decline_status + ");" );
	eval("self.user_obj_" + role_name + ".set_join_visible(" + join_status + ");" );
	eval("self.user_obj_" + role_name + ".enable_user_participant_change(" + enable_change_status + ");" );
	
}



ParticipantTableVM.prototype.create_rolename_array = function(game_style){
	
	var self = this;
	switch(game_style){
	  case 'NA':
		self.role_array = ["PrimeMinister","LeaderOpposition","MemberGovernment","MemberOpposition","ReplyPM","LOReply"];
		self.container_array = ["PM_Container","LO_Container","MG_Container","MO_Container","PMR_Container","LOR_Container"];
		break;
	  case 'Asian':
	  	self.role_array = ["PrimeMinister","LeaderOpposition","DeptyPrimeMinister","DeptyLeaderOpposition",
                      "GovernmentWhip","OppositionWhip","GovermentReply","OppositionReply"];
                self.container_array = ["PM_Container","LO_Container","DPM_Container","DLO_Container",
                            "GW_Container","OW_Container","GR_Container","OR_Container"];
		break;
	  case 'BP':
	  	self.role_array = ["PrimeMinister","LeaderOpposition","DeptyPrimeMinister","DeptyLeaderOpposition",
                      "MemberGovernment","MemberOpposition","GovermentWhip","OppositionWhip"];
          	self.container_array = ["PM_Container","LO_Container","DPM_Container","DLO_Container",
                            "MG_Container","MO_Container","GW_Container","OW_Container"];
		break;
	}
	
}

ParticipantTableVM.prototype.CreateTableTemplate = function(game_style){

	var participant_table_element = $("#participant_table" );

	switch(game_style){
	  case 'NA':
		NA_html_Template = _.template($('[data-template="NA_Template"]').html());
		var NA_html_text = NA_html_Template();
		participant_table_element.html(NA_html_text);
		break;
	  case 'Asian':
		Asian_html_Template = _.template($('[data-template="Asian_Template"]').html());
		var Asian_html_text = Asian_html_Template();
		participant_table_element.html(Asian_html_text);
		break;
	  case 'BP':
		BP_html_Template = _.template($('[data-template="BP_Template"]').html());
		var BP_html_text = BP_html_Template();
		participant_table_element.html(BP_html_text);
		break;
	}
}


