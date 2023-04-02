import React from 'react';
import { useDispatch,useSelector } from "react-redux";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';



import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts,fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch=useDispatch();
const { posts, tags}= useSelector(state => state.posts);

const isPostsLoading = posts.status=== 'loading';
const isTagsLoading = tags.status=== 'loading';

// let images = {
//   images1:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.publicdomainpictures.net%2Fpictures%2F130000%2Fvelka%2Ftextured-background-1441649840Brm.jpg&f=1&nofb=1&ipt=ea6331dc3fee39b8736d79a4f75800e386f5a01b2e1b3b821aca112744aaa159&ipo=images"
// }

React.useEffect(()=>{
dispatch(fetchPosts())
dispatch(fetchTags())
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);



  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj,index) => 
          isPostsLoading ? (
           <Post key = {index} isLoading={true}/>
           ):(
           < Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable
            />
          ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Harut Azatyan',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Harut Azatyan',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
