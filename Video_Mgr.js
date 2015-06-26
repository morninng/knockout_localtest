 function VideoViewModel(){

  var self = this;
  self.speech_visible = ko.observable(false);
  self.speech_role = ko.observable(); 
  self.speaker_name = ko.observable(); 
  self.speech_time = ko.observable(); 

  self.normal_buttons = ko.observable(false);
  self.complete_speech_button = ko.observable(false); 
  self.poi_button = ko.observable(false); 
  self.finish_poi_button = ko.observable(false); 
  self.finish_poi_bySpeaker_button = ko.observable(false); 
    
  self.start_speech = ko.observable(false); 
  self.role_name_array = ko.observableArray();
  
  self.poi_candidate_visible = ko.observable(true); 
  self.poi_candidate_view_array = ko.observableArray();

 }

 
 VideoViewModel.prototype.take_poi = function(data, event){
	console.log(data.hangout_id);
 }


 VideoViewModel.prototype.push_candidate = function(in_img_url, in_name,in_PoiTake, in_cancel, in_hangout_id){
 
 
 	/*ここは実際は、hangout_idをうけとり、ParticipantMgrからデータをうけとって表示するようにしよう。*/
 	
 	var self = this;
 	self.poi_candidate_view_array.push({img_url:in_img_url, name:in_name,PoiTake_button_visible:in_PoiTake, cancel_button_visible:in_cancel, hangout_id: in_hangout_id});
 	console.log(in_name);

 }

 VideoViewModel.prototype.remove_candidate = function(in_hangout_id){
 	
 	var self = this;
 	self.poi_candidate_view_array.remove(function(item) { return item.hangout_id == in_hangout_id });
 }



 VideoViewModel.prototype.click_complete_speech = function(){
  
 }

 VideoViewModel.prototype.click_poi = function(){
 
 }

 VideoViewModel.prototype.finish_poi = function(){
 
 }

 VideoViewModel.prototype.finish_poi_bySpeaker = function(){
 
 }

 VideoViewModel.prototype.updateModel = function(){
   var self = this;
   self.speech_visible(true);
 }


 var view_model = new VideoViewModel();
 ko.applyBindings(view_model);






function ADD_POI_CANDIDATE(){
 view_model.push_candidate("./download.jpg", "Yuta", true, true,"XXXXX");
 view_model.push_candidate("./flower.jpg", "flwer", true, true,"YYYY");

}

function REMOVE_POI_CANDIDATE(){
 view_model.remove_candidate("YYYY");

}

function change_candidate_visible_flag(){

 var candidate_visible_flag = !view_model.poi_candidate_visible();
 view_model.poi_candidate_visible(candidate_visible_flag);

}


