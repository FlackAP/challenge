function newsFeed() {
   $.ajax({
     url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent("http://apps.shareholder.com/rss/rss.aspx?channels=7247&companyid=ABEA-4SW9EX&sh_auth=3611633203%2E0%2E0%2E41957%2Ebbbf2f040bc3a66f02b1974e7503788e"),
     dataType: 'json',
     success: function(data) {
       
       var stories = data.responseData.feed.entries;
       var fragment = '';
       
       if(stories) {
          
          for(var i=0;i < 2; i++) {
            if (stories[i]) {
              fragment += '<a class="news-link" href="'+stories[i].link+'"><strong>'+stories[i].title+'</strong></a>';
            }
          }
         
         $(".news-feed").append(fragment);
         }
       }
   });
}

