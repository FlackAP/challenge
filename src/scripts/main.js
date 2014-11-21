function newsFeed() {
   $.ajax({
     url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent("http://apps.shareholder.com/rss/rss.aspx?channels=7247&companyid=ABEA-4SW9EX&sh_auth=3611633203%2E0%2E0%2E41957%2Ebbbf2f040bc3a66f02b1974e7503788e"),
     dataType: 'json',
     success: function(data) {
       
       // let's set stories to equal our JSON from the rss feed (thanks google!)
       var stories = data.responseData.feed.entries;
       var html = '';
       
       if(stories) {
          for(var i=0;i < 2; i++) {
            if (stories[i]) {
              // take the published date and store it in a variable called date, then trim it down using substring
              var date = stories[i].publishedDate;
              var pubDate = date.substring(0, date.length - 14)
              //let's check to see if we trimmed off the right amount of characters from the date string
              console.log(pubDate)
              // I made the decision to omit the author as the information was not provided in the RSS feed
              html += '<p class="news-link" style="margin-bottom:0; padding-bottom:18px;"><a href="'+stories[i].link+'"><strong>'+stories[i].title+'</strong></a><br><span>'+pubDate+'</span></p>';
            }
          }
         
         // append our html fragment to newsfeed
         $(".news-feed").append(html);
         }
       }
   });
}

