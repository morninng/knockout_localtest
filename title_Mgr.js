function title_VM(){

	var self = this;
	self.title_show = ko.observable(false); 
	self.title_sentence = ko.observable();
	self.title_input = ko.observable(false); 
	self.title_value = ko.observable();
	self.title_width = ko.observable();
}

title_VM.prototype.initialize = function(){

	var self = this;
	self.title_show(true);
	var title = "start title title  title  le title title  title title title  title title title title title title title title title  title title title title title title title title last";
	self.title_sentence(title);
	var title_width = $("#event_title_show_out").width();
	var title_width_str = "width:" + String(title_width) + "px"
	self.title_width(title_width_str);
	self.title_input(false);
	self.title_value(title);

}

title_VM.prototype.activate_updating_title = function(){

	var self = this;
	self.title_show(false);
	self.title_input(true);

}

title_VM.prototype.send_title = function(){

}
title_VM.prototype.cancel_updating_title = function(){

	var self = this;
	self.title_show(true);
	self.title_input(false);

}

title_VM.prototype.update_title_server = function(){

}


