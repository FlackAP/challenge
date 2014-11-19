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
              // I made the decision to hard-code author/date here as I couldn't find the info in the RSS feed 
              fragment += '<p class="news-link" style="margin-bottom:0; padding-bottom:18px;"><a href="'+stories[i].link+'"><strong>'+stories[i].title+'</strong></a><br><span>By Caroline Potter on October 1, 2014</span></p>';
            }
          }
         
         $(".news-feed").append(fragment);
         }
       }
   });
}

