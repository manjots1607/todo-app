
$.get("/api/todos")
.then(function(data){
    data.forEach(function(td){
        
        $(".todos ul").append("<li id='"+td._id+"'> <div class='text'>"+td.name+ "</div><span class='del'>X</span></li>");
        if(td.completed){
            $("#"+td._id).addClass("strike");
        }
       
        
        $("#"+td._id + " .text").click(function(){
            strike(td._id);
        });

        $("#"+td._id + " .del").click( function(){
            del(td._id);
            
        });
        
    });
});
function strike(id){
    if($("#"+id).hasClass("strike")){
        completedfnc(id,false);
        $("#"+id).removeClass("strike");
    }
    else{
        completedfnc(id,true);
        $("#"+id).addClass("strike");
    }
}

function completedfnc(id,boolvar){
    $.ajax({
        url:"/api/todos/"+id,
        type:"PUT",
        data:{"completed":boolvar}
    })
    .done(function(data){
        $("#"+id+" .text").html(data.name);
    })
    .fail(function(err){
        console.log(err);
    });
}

function del(id){
   $.ajax("/api/todos/"+id,{
       method:"DELETE"
   })
   .then(function(data){
       if(data=="deleted successfully"){
           $("#"+id).remove();
       }
   })
   .catch(function(err){
       console.log(err);
   });
}

$('#nameInp').on("keypress", function(e) {
    if (e.keyCode == 13) {
        $.post("/api/todos",{
            name:$("#nameInp").val()
        })
        .then(function(td){
            $(".todos ul").append("<li id='"+td._id+"'> <div class='text'>"+td.name+ "</div><span class='del'>X</span></li>");
            $("#"+td._id + " .text").click(function(){
                strike(td._id);
            });
    
            $("#"+td._id + " .del").click( function(){
                del(td._id);
                
            });
            $('#nameInp').val("");
        })
        .catch(function(err){
            console.log(err);
        })
    }
});