$(document).ready(function() {
    var posts = Data.getPosts();


    Handlebars.registerHelper('json', function(posts) {
        var jsonStr = '';
        var imgUrl = '',
            likeCount = 0,
            description = '',
            userId = '',
            id = '';
        jsonStr ='<div>[</div>';
        for(var i=0; i < posts.length; i++) {
            imgUrl = posts[i].imgUrl;
            likeCount = posts[i].likeCount;
            description = posts[i].description;
            userId = posts[i].userId;
            id = posts[i].id;

            jsonStr = jsonStr + '<div class="posts-json__brace">{</div>' + '<div class=posts-json__row>' + '<span>\"imgUrl\": </span>' + '<span>\"' + posts[i].imgUrl + '\",</span>' + '</div>'
            + '<div class=posts-json__row>' + '<span>\"likeCount\": </span>' + '<span>\"' + posts[i].likeCount + '\",</span>' + '</div>'
            + '<div class=posts-json__row>' + '<span>\"description\": </span>' + '<span>\"' + posts[i].description + '\",</span>' + '</div>'
            + '<div class=posts-json__row>' + '<span>\"userId\": </span>' + '<span>\"' + posts[i].userId + '\",</span>' + '</div>'
            + '<div class=posts-json__row>' + '<span>\"id\": </span>' + '<span>\"' + posts[i].id + '\"</span>' + '</div>'
            + '<div class="posts-json__brace">},</div>';
        }
        jsonStr = jsonStr +']</div>';

        return new Handlebars.SafeString(jsonStr);
    });

    Handlebars.registerHelper('table', function(posts, options) {
        var tableStr = '';
        var description = '';

        for(var i=0; i < posts.length; i++) {
            description =options.fn(posts[i]);
            tableStr = tableStr + '<div class="posts-table__row">' +description+ '</div>';
        }

        return new Handlebars.SafeString(tableStr);
    });



    var jsonHTML   = $('#posts-json-template').html();
    var jsonTemplate = Handlebars.compile(jsonHTML);

    var tableHTML   = $('#posts-table-template').html();
    var tableTemplate = Handlebars.compile(tableHTML);

    $('.posts-json').html(jsonTemplate({posts: Data.getPosts()}));

    $('.posts-table').html(tableTemplate({posts: Data.getPosts()}));
    //console.log(tableTemplate({posts: posts}));



});

