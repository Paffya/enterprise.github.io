import React, { useState, useEffect } from "react";
import "../Styles/Article.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ShareButton from "../Components/ShareButton";
import API_ROOT from '../apiConfig';

const PostPreview = () => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };


  

  const { cat_slug, post_name } = useParams();
  const [postloading, setPostLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [postData, setPostData] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the user's IP address from the ipify service
       

        

          // Continue with the rest of your code to fetch other data
          const response = await fetch(
            `${API_ROOT}/api/post/preview-post/${cat_slug}/${post_name}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          setHtmlContent(data.result[0].post_content);
          setAuthorId(data.result[0].post_author_id);
          setPostData(data.result);
   
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setPostLoading(false);
      }
    };

    fetchData();
  }, [cat_slug, post_name]);


  useEffect(() => {
   
    axios
      .get(`${API_ROOT}/api/post/latest`)
      .then((response) => {
        setLatestPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 




  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_ROOT}/api/post/asidetopic/${cat_slug}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const removeHtmlTags = (html) => html.replace(/<[^>]*>/g, "");
        const result = await response.json();
        setData(
          result.result.map((post) => ({
            ...post,
            post_content: removeHtmlTags(post.post_content),
          }))
        );
      
      } catch (error) {}
    };

    fetchData();
  }, []);

  const [advertisementData, setAdvertisementData] = useState([]);

  useEffect(() => {
    const fetchAdvertisementData = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/api/advertisement/get_active`
        );
        setAdvertisementData(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching advertisement data:", error);
      }
    };

    fetchAdvertisementData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts




  



  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/api/author/2`);
        setAuthorData(response.data.result[0]);
      
      } catch (error) {
        console.error('Error fetching author data:', error.message);
      }
    };

    fetchAuthorData();
  }, []);




  // const [randomName, setRandomName] = useState('');
  // const [randomDescription, setRandomDescription] = useState('');

  // useEffect(() => {
  //   if (!authorData.author_display_name) {
  //     // Generate a random name when author_display_name is not present
  //     const randomNames = ['John Doe', 'Jane Doe', 'Anonymous', 'Mystery Author'];
  //     const randomIndex = Math.floor(Math.random() * randomNames.length);
  //     setRandomName(randomNames[randomIndex]);
  //   }

  //   if (!authorData.author_description) {
  //     // Generate a random description when author_description is not present
  //     const randomDescriptions = ['A mysterious author', 'Passionate storyteller', 'Author of the unknown'];
  //     const randomIndex = Math.floor(Math.random() * randomDescriptions.length);
  //     setRandomDescription(randomDescriptions[randomIndex]);
  //   }
  // }, [authorData.author_display_name, authorData.author_description]);



  return (
    <div>
      <div className="container container-max ">
        <div className="row ">
          <div className="hr"></div>

          <div className="col-md-8 borderR mt-2">
            {postloading ? (
              <p></p>
            ) : (
              <div>
                {/* Content for the 70% column */}
                <div className="paddings">
                  {/* <p> {console.log('postdata '+ postData[0].post_title)}</p> */}
                  <h1 className="fw-bold mt-1 h2 ">{postData[0].post_title}</h1>

                  <div className="d-flex justify-content-between">
                    <div style={{ lineHeight: "2", width: "40%" }}>
                      <p style={{ fontSize: "14px" }}>
                        By{" "}
                        <span className="fw-bold">
                          {postData[0].post_author}
                        </span>{" "}
                        |{" "}
                        {new Date(postData[0].post_date).toLocaleDateString(
                          undefined,
                          options
                        )}
                      </p>
                    </div>

                    <div className="">
                      <ShareButton />
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <img
                    className="topicImg"
                    // src={postData[0].banner_img}
                    src={`${API_ROOT}/uploads/${postData[0].banner_img}`}
                    alt={postData[0].banner_alt}
                  />
                </div>

                <div style={{ fontSize: "14px" }}>
                  <p className="paddings">
                    <div
                      className="content mt-2"
                      dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                  </p>
                </div>

                <div className="ArticleBox mt-5 mb-5" style={{ alignItems: "center" }}>
      {authorData && (
        <>
          <div>
            <img
              className="ArticleImg"
              src={`${API_ROOT}/uploads/author-profiles/${authorData.author_photo}` || `${API_ROOT}/uploads/author-profiles/default-author.jpg`}
              alt={authorData.author_name}
            />
          </div>
          <div style={{ fontSize: "14px", padding: "10px" }}>
            <h2 className="fw-bold h6">{authorData.author_display_name || "Praful Dalwi"}</h2>
            <p>{authorData.author_description || "this ia ETBureauenterprisetalk.com author"}</p>
          </div>
        </>
      )}
    </div>
{/* 
                <div
                  className=" ArticleBox mt-5 mb-5"
                  style={{ alignItems: "center" }}
                >
                  <div>
                    <img
                      className="ArticleImg"
                      src="https://people.com/thmb/RpnNLplOGndVrTF-rdBlp0biuxE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(719x39:721x41)/Emma-Watson-c59dff78899047bb839b894665b85a13.jpg"
                      alt="Emma Watson"
                    />
                  </div>
                  <div style={{ fontSize: "14px", padding: "10px" }}>
                    <h2 className="fw-bold h6">Jane Smith</h2>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Sit, vero praesentium quibusdam officiis itaque distinctio
                      magnam sequi quia, tempora vitae, labore reiciendis natus
                      facere temporibus cupiditate dignissimos nisi! Dolorum,
                      illum!
                    </p>
                  </div>
                </div> */}
              </div>
            )}

            <h3 className="fw-bold borderB py-1 h5">
              More from Enterprise Talk
            </h3>
            {latestPosts.slice(0, 4).map((post, index) => (
              <a href={`/${post.cat_slug}/${post.post_name}`}>
                {" "}
                <div
                  className="d-flex mt-3 mb-3"
                  style={{ alignItems: "center" }}
                >
                  <div className="quickImgBox">
                    <img
                      style={{ width: "90%", borderRadius: "14px" }}
                      src={post.banner_img}
                      alt={post.banner_alt}
                    />
                  </div>

                  <div className="" style={{ width: "74%" }}>
                    <h4 className="fw-bold hoverHead quickText h5">
                      {post.post_title}
                    </h4>
                    <p style={{ fontSize: "13px" }}>
                      By <span className="fw-bold">{post.post_author}</span> |{" "}
                      {new Date(post.post_date).toLocaleDateString(
                        undefined,
                        options
                      )}
                    </p>
                  </div>
                </div>{" "}
              </a>
            ))}
          </div>

          <div className="col-md-4">
            <div className=" borderB paddings">
              <h5 className="fw-bold">Related Articles</h5>
            </div>
            <div>
              {data.slice(0, 4).map((post, index) => (
                <div key={index} className="paddings">
                  <a href={`/${post.cat_slug}/${post.post_name}`}>
                    <h5 className="fw-bold h5 hoverHead line-clamp">
                      {post.post_title}
                    </h5>
                  </a>
                  <p style={{ fontSize: "13px" }}>
                    By <span className="fw-bold">{post.post_author}</span> |{" "}
                    {new Date(post.post_date).toLocaleDateString(
                      undefined,
                      options
                    )}
                  </p>

                  <div className="d-flex gap-3">
                    <div style={{ width: "90%" }}>
                      <p
                        className="just-text line-clamp mt-1"
                        style={{ fontSize: "15px" }}
                      >
                        {post.post_content}
                      </p>
                    </div>

                    <div>
                      <span className="numb">{index + 1}</span>
                    </div>
                  </div>

                  <p className="hr" />
                </div>
              ))}
            </div>

            <div className="marTop sticky-top" style={{ height: "" }}>
              {/* Content for the 30% column */}
              {/* <p className="bllack">340*1500</p> */}
              {advertisementData && advertisementData.length > 0 && (
                <a href={`/${advertisementData[0].dest_url}`}>
                  {" "}
                  <img
                    style={{ height: "", width: "100%" }}
                    src={`${API_ROOT}/uploads/promo_img/${advertisementData[0].banner_img}`}
                    alt={advertisementData[0].banner_name}
                  />{" "}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container container-max ">
        <div className="row">
          {/* <h5 className="fw-bold borderB py-1 h5">More from Enterprise Talk</h5> */}

          {/* <div className="col-md-8 borderR">

         

           

           

            <div className="borderB"></div>
          </div> */}

          {/* <div className="col-md-4">
            <div style={{ height: "550px" }}>
              
              <img style={{height:"550px", width:"100%"}} src="https://enterprisetalk.com/wp-content/uploads/2022/12/Advertorial-banner-1.jpg" alt="" />
            </div>
          </div> */}
        </div>
      </div>

      <div className="container container-max ">
        <div className="row mt-5 spaceincontentbottm">
          <div className="col-md-12 mb-2 borderB">
            <div>
              {advertisementData && advertisementData.length > 0 && (
                <a href={`/${advertisementData[2].dest_url}`}>
                  {" "}
                  <img
                    style={{ width: "100%" }}
                    src={`${API_ROOT}/uploads/promo_img/${advertisementData[2].banner_img}`}
                    alt={advertisementData[2].banner_name}
                  />{" "}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
