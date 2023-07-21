





    $(document).ready(function() { // for fetch Data //

        //     load_data();
 
       // function load_data() {
 
       var dataTable = $('#table_data').DataTable({
         'processing' : true,
         'serverSide' : true,
         'serverMethod' : 'get',
         'ajax' : {
             'url' : 'http://localhost:3000/sender/get_data',
             
         },
 
         'aaSorting' : [],
         'columns' : [
          
             { data : 'sender_name', },
               { data : 'sender_email' },
              { data : 'sender_id' }
            
             
         ],
 
         columnDefs: [
             {
                 targets: 2,
                 orderable: false,
                 render: function (data) {
                     return `
                       
                     <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"  data-id=" `+data+` "><i class="fa fa-trash"></i></button>
                     <button type="button" class="btn btn-link btn-sm edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"  data-id =" `+data+` "><i class="fa fa-pencil"></i></button>
                         
                         `;
                 }
             }
            
             
         ]
   
         
       });

    $('#add_data').click(function() { // for insert the Data //

        $('#dynamic_modal_title').text('Add Data');

        $('#sample_form')[0].reset();

        $('#action').val('Add');

        $('#action_button').text('Add');

        $('#action_modal').modal('show');

    });

    $('#sample_form').on('submit', function(event) {

        event.preventDefault();

        $.ajax({
            url: "http://localhost:3000/sender/action",
            method: "POST",
            data: $('#sample_form').serialize(),
            dataType: "JSON",
            beforeSend: function() {
                $('#action_button').attr('disabled', 'disabled');
            },
            success: function(data)

            {
              
                $('#action_button').attr('disabled', false);
                $('#sample_form').DataTable().ajax.reload();
                $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();
                
                $('#action_modal').modal('hide');

                

                setTimeout(function() {
                    $('#message').html('');
                }, 5000);
                load_data();
            }
        });

    });


$(document).on('click', '.edit', function() { // for edit data //

var sender_id = $(this).data('id');


$('#dynamic_modal_title').text('Edit Data');

$('#action').val('Edit');

$('#action_button').text('Edit');

$('#action_modal').modal('show');


$.ajax({
    url: "http://localhost:3000/sender/action",
    method: "POST",
    data: {
        sender_id: sender_id,
        action: 'fetch_single'
    },
    dataType: "JSON",
    success: function(data)

    {

        $('#sender_name').val(data.sender_name);
        $('#sender_email').val(data.sender_email);
        $('#sender_id').val(data.sender_id);
       
    }
});

});

$(document).on('click', '.delete', function(){

var sender_id = $(this).data('id');

    if(confirm("Are you sure you want to delete this data?"))
    {
        $.ajax({
            url:"http://localhost:3000/sender/action",
            method:"POST",
            data:{action:'delete', sender_id:sender_id},
            dataType:"JSON",
            success:function(data)
            {
                $('#message').html('<div class="alert alert-success">'+data.message+'</div>').fadeIn();
                load_data();
                setTimeout(function(){
                     $('#message').html('');
                }, 1000);
                load_data();
            }
        });
    }

});
});

