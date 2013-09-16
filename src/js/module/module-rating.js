(function($){
	function RatingVM($el){
		this.$el = $el;
	}

	$.extend(RatingVM, {
		options : {
			maxValue : 5
		},
		template :
			'<label id="module-rating-label-<%= id %>" class="visuallyhidden">Rating</label>' +
			'<% for(var i = 1; i <= options.maxValue; i++) { %>' +
				'<label class="module-rating-label" for="module-rating-<%= id %>-input-<%= i %>">' +
					'<span class="module-rating-labelvalue"><%= i %></span>' +
					'<input type="radio" id="module-rating-<%= id %>-input-<%= i%>" aria-describedby="module-rating-label-<%= id %>" name="module-rating-<%= id %>" value="<%= i %>" <% if(value == i) { %>checked="checked"<% } %> />' +
					'<span class="icon icon-rating">&nbsp;</span>' +
				'</label>' +
			'<% } %>'
	});

	$.extend(RatingVM.prototype, {
		id : '',
		value : 0,
		init : function(id, initialValue, options){
			if(!id){
				throw new Error('RatingVM : id must be defined');
			}
			this.options = $.extend({}, RatingVM.options, options);
			this.id = id;
			if(initialValue < 0 || initialValue > this.options.maxValue) {
				initialValue = 0;
			}
			this.value = initialValue || 0;
			this.transformDOM();
			this.bindListeners();
			this.render();
		},
		destroy : function(){
			this.unbindListeners();
			this.$el = null;
		},
		bindListeners : function(){
			this.$el.on('change.module-rating', 'input', $.proxy(this.onInputUpdate, this));
		},
		unbindListeners : function(){
			this.$el.off('change.module-rating');
		},
		transformDOM : function(){
			var content = _.template(RatingVM.template, this);
			this.$el.empty().html(content).fadeIn();
			this.labels = this.$el.find('.module-rating-label');
		},
		onInputUpdate : function(e){
			var value = parseInt($(e.currentTarget).val(), 10);
			this.updateValue(value);
		},
		updateValue : function(value){
			if(this.value != value && this.validate(value)){
				this.value = value;
				this.render();
				RatingService.rate(this.id, this.value);
			}
		},
		validate : function(value){
			if(value >= 0 && value <= this.options.maxValue) {
				return true;
			}
			return false;
		},
		render : function(){
			var value = this.value;
			this.labels.each(function(i){
				if(value > i){
					$(this).find('.icon').addClass('icon-rating-selected').removeClass('icon-rating');
				} else {
					$(this).find('.icon').removeClass('icon-rating-selected').addClass('icon-rating');
				}
			});
		}
	});

	var RatingService = {
		rate : function(id, value){
			return $.post('rating/' + id, {
				value : value
			});
		}
	};

	$.fn.moduleRating = function(){
		this.each(function(){
			var $this = $(this);
			var ratingVM = new RatingVM($this);
			ratingVM.init($this.data('rating-id'), parseInt($this.data('value'), 10));
			$this.data('module-rating', ratingVM);
		});
	};
}(jQuery));