function requireLogin(){
    window.location = "/accounts/login/";
    return false;
}

//news
$('*[data-target="#newsFormModal"], .like, .comment').click(requireLogin);

//qa
$('#questionUpVote, #questionDownVote, #answerUpVote, #answerDownVote').click(requireLogin);