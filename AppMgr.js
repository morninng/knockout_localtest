
function AppMgr() {
  	var self = this;
	self.own_parse_id="XXXX";
	self.game_id="YYYYY";
	self.own_hangoutid = "hangout_XXX2";
	self.game_obj = new Object();
	self.game_status = 0;
}

AppMgr.prototype.initialize = function(in_game_obj){

  	var self = this;
	self.participant_manager_object = new ParticipantMgr();

	// hangout statusで受け取るJSONコード
	var parse_hangout_mapping = [ 
		         {parse_id:"parse_XXX1", hangout_id:"hangout_XXX1"},
		         {parse_id:"parse_XXX2", hangout_id:"hangout_XXX2"},
		         {parse_id:"parse_XXX3", hangout_id:"hangout_XXX3"},
		         {parse_id:"XXXX", hangout_id:"ZZZZZ"},
		         {parse_id:"tQDJHWFq27", hangout_id:"hangout_XXX4"}
		         ];

	self.participant_manager_object.set_parseid_hangoutid_mapping(parse_hangout_mapping );

	self.game_obj = in_game_obj;
/*
	self.game_obj = {
	game_style:"NorthAmerica",
	debater_data_array:[
		{role:"PrimeMinister",parse_id:"parse_XXX2",first_name:"Yagi",last_name:"Moriyama",pict_src:"./picture/download.jpg"},
		{role:"LeaderOpposition", parse_id:"parse_XXX2",first_name:"Flower",last_name:"AAA",pict_src:"./picture/flower.jpg"},
		{role:"ReplyPM", parse_id:"parse_XXX3",first_name:"Yuta",last_name:"Beautiful",pict_src:"./picture/1005335_976308.jpg"},
		{role:"LOReply", parse_id:"XXXX",first_name:"ccc",last_name:"Girl",pict_src:"./picture/robot.jpg"}
		],
	audience_data_array:
		[{role:"Audience1",parse_id:"tQDJHWFq27",first_name:"Robot",last_name:"robot",pict_src:"robot.jpg"},
		 {role:"Audience2",parse_id:"tQDJHWFq27",first_name:"ccc",last_name:"CCC",pict_src:"http://eee.jpg"}
		],
	hangout_ids:
		{
		 main:"XXXX",
		 Gov:"YYYY",
		 Opp:"ZZZ"
		},
	game_title:"thw legalize tobacco"
	};
*/

	self.participant_manager_object.initialize(self.game_obj, self.own_parse_id, self.own_hangoutid); 

	//hangout_statusで受け取る game statusをparticipantmgr, container_modelview, chat_mgr,に反映 
	//participant changed eventが走るときに毎回呼び出す。
	//	self.participant_table = new ParticipantTableVM();

	var Video_html_Template = _.template($('[data-template="video_area_template"]').html());
    var video_element = $("#video_area");
    var Video_html_text = Video_html_Template();
    video_element.html(Video_html_text);

    var video_view_model = new VideoViewModel();
    var element = document.getElementById('video_area');
    ko.applyBindings(video_view_model, element);

	// hangout statusで受け取るJSONコード
	/*
	var hangout_speech_status = {
		poi_speaker: {hangout_id :"hangout_XXX1", role : "POI"},
		speaker: {hangout_id :"hangout_XXX1", role : "PrimeMinister"},
		poi_candidate: ["hangout_XXX2", "hangout_XXX3"]
	}*/

	var hangout_speech_status = {
		poi_speaker: null,
		speaker: null,
		poi_candidate: []
	}

	video_view_model.update_speaker(hangout_speech_status, self.own_hangoutid);
	video_view_model.update_poi_candidate(hangout_speech_status, self.own_hangoutid);
}

AppMgr.prototype.update_game_status = function(num){

	var self = this;
	self.participant_manager_object.update_game_status(num);

}


