$(function () {
    $('form').on('submit',function(){
        var data = [];
        $(this).find("input").each(function(child) {
            if(this.type != "hidden"){
                data.push({name:this.name, value:this.value});
            }
        });
        logUserUpdate();
    });
});