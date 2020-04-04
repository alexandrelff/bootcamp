$(function () {
  $(".publish").click(function () {
    $("input[name='status']").val("P");
    $("#article-form").submit();
    logEvent("ARTICLE_NEW");
  });

  $(".update").click(function () {
    $("input[name='status']").val("P");
    //$("input[name='edited']").prop("checked");
    $("input[name='edited']").val("True");
    $("#article-form").submit();
    logEvent("ARTICLE_UPDATE");
  });

  $(".draft").click(function () {
    $("input[name='status']").val("D");
    $("#article-form").submit();
    logEvent("ARTICLE_DRAFT");
  });
});
