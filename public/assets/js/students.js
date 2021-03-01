$('select#batch').change(function(){
	var batchId = $(this).val();
	if(!batchId) return;
	$.ajax({
		url: "/subject/getSubjectByBatch", 
		data: {
			batchId: batchId
		},
		dataType: 'json',
		success: function(result){
			var opt = '';

			if(result.lstSubject.length){
				result.lstSubject.forEach(function(v){
					 opt += '<option value="'+v._id+'">'+v.name+'</option>';
				});
			}

			$('select#subjects').html(opt);
			$('select#subjects').multiselect('rebuild');



	  	}
  	});
}).trigger('change');