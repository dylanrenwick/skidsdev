<?php

/**
 * The post controller: Just an example of simple create, read, update and delete (CRUD) actions.
 */
class PostController extends Controller
{
    /**
     * Construct this object by extending the basic Controller class
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * This method controls what happens when you move to /post/index in your app.
     * Gets all posts (of the user).
     */
    public function index()
    {
        $showHidden = LoginModel::isUserLoggedIn();
        $this->View->render('post/index', array(
            'posts' => PostModel::getAllPosts(0, $showHidden)
        ));
    }

    public function post($post_id)
    {
        $post = PostModel::getPost($post_id);
        if ($post === false) {
            $this->controller = new ErrorController;
            $this->controller->error404();
            return;
        }
        $this->View->renderMetaPreview($post->title, $post->text, '');
        $this->View->render('post/post', array(
            'post' => PostModel::getPost($post_id),
            'series_info' => SeriesPostModel::getSeriesInfoByPost($post_id)
        ));
    }

    /**
     * This method controls what happens when you move to /post/create in your app.
     * Creates a new post. This is usually the target of form submit actions.
     * POST request.
     */
    public function create()
    {
        Auth::checkAuthentication();
        PostModel::createPost(Request::post('post_text'));
        //Redirect::to('post');
    }

    public function preview()
    {
        $this->View->renderMarkdown(Request::post('text'));
    }

    /**
     * This method controls what happens when you move to /post/edit(/XX) in your app.
     * Shows the current content of the post and an editing form.
     * @param $post_id int id of the post
     */
    public function edit($post_id = -1)
    {
        Auth::checkAuthentication();
        $params = array();
        if ($post_id >= 0) $params['post'] = PostModel::getPost($post_id);
        $this->View->render('post/edit', $params);
    }

    /**
     * This method controls what happens when you move to /post/editSave in your app.
     * Edits a post (performs the editing after form submit).
     * POST request.
     */
    public function editSave()
    {
        Auth::checkAuthentication();
        $post_id = Request::post('post_id');
        $post_text = Request::post('post_text');
        $post_title = Request::post('post_title');
        $post_tags = Request::post('post_tags');
        $post_series = intval(Request::post('post_series'));
        if ($post_id >= 0) {
            PostModel::updatePost($post_id, $post_title, $post_text, $post_tags, $post_series);
        } else {
            PostModel::createPost($post_title, $post_text, $post_tags, $post_series);
        }
        //Redirect::to('post');
    }

    public function publish($post_id)
    {
        Auth::checkAuthentication();
        PostModel::publishPost($post_id);
    }

    /**
     * This method controls what happens when you move to /post/delete(/XX) in your app.
     * Deletes a post. In a real application a deletion via GET/URL is not recommended, but for demo purposes it's
     * totally okay.
     * @param int $post_id id of the post
     */
    public function delete($post_id)
    {
        Auth::checkAuthentication();
        PostModel::deletePost($post_id);
        Redirect::to('post');
    }
}
