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

  self.current_speaker = null;
  self.own_hangout_id = null;

 }

VideoViewModel.prototype.update_speaker = function(hangout_speech_status, own_hangoutid){

  var self = this;
  self.own_hangout_id = own_hangoutid;
  var speaker_hangout_id = hangout_speech_status.speaker;
  var poi_speaker_hangout_id = hangout_speech_status.poi_speaker;
  var speaker_type = null;

  if(poi_speaker_hangout_id){
    self.show_Speaker(poi_speaker_hangout_id, "poi");
    self.poi_candidate_view_array().splice(0, self.poi_candidate_view_array.length);
  }else if (speaker_hangout_id){
    self.show_Speaker(speaker_hangout_id, "speaker");
  }else{
    self.show_Speaker(null, "discussion");
  }

}

VideoViewModel.prototype.update_poi_candidate = function(hangout_speech_status, own_hangoutid){

  var self = this;
 // var _ = require('lodash');
  var next_candidate_array = hangout_speech_status.poi_candidate; 
  var current_poi_candidate_array = self.poi_candidate_view_array()

  var new_poi_candidate_array = _.difference(next_candidate_array, current_poi_candidate_array);
  var remove_poi_candidate_array = _.difference(current_poi_candidate_array, next_candidate_array);

  for(var i=0; i<new_poi_candidate_array.length; i++){
    self.add_candidate(new_poi_candidate_array[i]);
  }

  for(var i=0; i<remove_poi_candidate_array.length; i++){
    self.remove_candidate(remove_poi_candidate_array[i]);
  }


}

 VideoViewModel.prototype.show_Speaker = function(hangout_id, status){
  var self = this;
  self.current_speaker = hangout_id;
  
 }
 
 VideoViewModel.prototype.take_poi = function(data, event){
  console.log(data.hangout_id);
 }


 VideoViewModel.prototype.add_candidate = function( in_hangout_id){

  var self = this;
  var name = appmgr.participant_manager_object.getName_fromHangoutID(in_hangout_id);
  var pict_src = appmgr.participant_manager_object.getPictSrc_fromHangoutID(in_hangout_id);
  var poi_take_visible = false;
  var poi_cancel_visible = false;
  if(self.current_speaker == self.own_hangout_id){
    poi_take_visible = true
  }
  if(in_hangout_id == self.own_hangout_id){
    poi_cancel_visible = true;
  }
  self.poi_candidate_view_array.push({img_url:pict_src, name:name,PoiTake_button_visible:poi_take_visible, cancel_button_visible:poi_cancel_visible, hangout_id: in_hangout_id});
 
 }


 VideoViewModel.prototype.remove_candidate = function(in_hangout_id){
  
  var self = this;
  self.poi_candidate_view_array.remove(function(item) { return item.hangout_id == in_hangout_id });
 }

  VideoViewModel.prototype.remove_candidate_all = function(in_hangout_id){
  }

 VideoViewModel.prototype.show_start_speeh_button = function(){

  self.start_speech(true);
  app_mgr.participant.get_role_array();
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

