# Hexo Rage Face Tag

Hexo tag support for pulling rage faces.

## How to install

    npm install hexo-tag-rage-face --save

At runtime Hexo will detect it in your `package.json` and load it.

## How to use

#### Add this to your blog post:

    {% rage_face 'U mad troll' style:width:300px %}

#### Result:

![troll](http://www.memes.at/faces/u_mad_troll.gif)

You can add more attributes to the tag using `key:value` pattern. If the value has whitespaces you can quote the whole pair like `'key:value'`.

#### How it works:

1. Converts name input to snake case
2. Polls memes.at to see if there is a matching image using .jpg, .gif, .png, one attempt after another.
3. Uses the one found or displays nothing so your post won't be broken.

## Limitations

1. Extension list is hard-coded for now.
2. Source site url is hard-coded.
3. memes.at doesn't have SSL support so if your blog uses https it won't work due to browser secruity enforcement.
