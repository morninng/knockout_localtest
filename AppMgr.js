

function Mixidea_Debate_app(){

	var self = this;
	self.own_parse_id="XXXX";
	self.game_id="YYYYY";
	self.own_hangoutid = "ZZZZZ";

	var game_obj = new Object();
	game_obj = {
	game_style:"NorthAmerica",
	debater_data_array:[
		{role:"PrimeMinister",parse_id:"tQDJHWFq27",first_name:"Yuta",last_name:"Moriyama",pict_src:"http://aaa.com"},
		{role:"LeaderOpposition", parse_id:"parse_XXX2",first_name:"aaa",last_name:"AAA",pict_src:"http://aaa.jpeg"},
		{role:"ReplyPM", parse_id:"XXXX",first_name:"Yuta",last_name:"Moriyama",pict_src:"http://aaa.com"},
		{role:"LOReply", parse_id:"parse_XXX2",first_name:"ccc",last_name:"CCC",pict_src:"http://eee.jpg"}
		],
	audience_data_array:
		[{parse_id:"ZZZZ",first_name:"parse_XXX3",last_name:"CCC",pict_src:"http://eee.jpg"},
		 {parse_id:"ZZZZ",first_name:"ccc",last_name:"CCC",pict_src:"http://eee.jpg"}
		],
	hangout_ids:
		{
		 main:"XXXX",
		 Gov:"YYYY",
		 Opp:"ZZZ"
		}
	};

	 var own_parse_id = "tQDJHWFq27";
	 self.participant_manager_object = new ParticipantMgr(game_obj, own_parse_id, self.own_hangoutid);


	// hangout statusで受け取るJSONコード

	var parse_hangout_mapping = [ 
		         {parse_id:"parse_XXX1", hangout_id:"hangout_XXX1"},
		         {parse_id:"parse_XXX2", hangout_id:"hangout_XXX2"},
		         {parse_id:"parse_XXX3", hangout_id:"hangout_XXX3"},
		         {parse_id:"XXXX", hangout_id:"ZZZZZ"},
		         {parse_id:"tQDJHWFq27", hangout_id:"hangout_XXX4"}
		         ];

	self.participant_manager_object.set_parseid_hangoutid_mapping(parse_hangout_mapping );

	//participant changed eventが走るときに毎回呼び出す。

	self.participant_manager_object.update_participants();
}

