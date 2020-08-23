
/* (function(window, $) {
  'use strict';
 	$('.btn-edit').click(function(){ // do a action when click on element that has class is btn-edit
 		var $this = $(this); // this is element that you clicked on
 		var $tr = $this.closest('tr'); // returns the first ancestor of the selected element in the dom, in this case: fist tr element that is ancestor of $this 
 		var itm = $tr.data('batch'); // get data of batch, batchdata store in attribute data-batch of tr element. Ref to data-batch="{json this}" in batch.hbs file
 		var $modelUpdate = $('#update-batch'); // just selector to update-batch modal
 		$modelUpdate.modal('show');// make modal appear
 		console.log(itm);
 		$('input[name="name"]', $modelUpdate).val(itm.name);// set value for input name field
 		$('input[name="category"]', $modelUpdate).val(itm.category); // set value for input category field

 		var upUrl = '/programmes/edit/batch/'+itm._id;
 		$('form', $modelUpdate).attr('action', upUrl); // set action url of update form to correct path and correct Id
 	});

})(window, jQuery); */
 