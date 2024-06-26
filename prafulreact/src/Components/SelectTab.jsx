import React, { useEffect, useState } from "react";
import { Tab, Nav, Col, Row, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import {API_ROOT,webPath} from "../apiConfig";

const SelectTab = () => {
  const { cat, subcat } = useParams();

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const [postData, setPostData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `${API_ROOT}/api/post/topic/${cat}`;

        if (subcat) {
          apiUrl += `/${subcat}`;
        }

        apiUrl += `?page=${pagination.page}&limit=${pagination.limit}`;

        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        // console.log('jsonData:', jsonData);

        // Check if jsonData is an object and has the expected structure
        if (
          typeof jsonData === "object" &&
          jsonData !== null &&
          "posts" in jsonData
        ) {
          const { posts } = jsonData;

          // Ensure posts is an object with postData and pagination properties
          if (
            typeof posts === "object" &&
            posts !== null &&
            "postData" in posts &&
            "pagination" in posts
          ) {
            const { postData, pagination } = posts;

            // Ensure pagination is an object with totalItems and totalPages properties
            if (
              typeof pagination === "object" &&
              pagination !== null &&
              "totalItems" in pagination &&
              "totalPages" in pagination
            ) {
              setPostData(postData);
              setPagination((prevPagination) => ({
                ...prevPagination,
                totalItems: pagination.totalItems,
                totalPages: pagination.totalPages,
              }));
            } else {
              console.error("Invalid pagination structure:", pagination);
            }
          } else {
            console.error("Invalid posts structure:", posts);
          }
        } else {
          console.error("Invalid JSON data structure:", jsonData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pagination.page, pagination.limit, cat, subcat]);

  const handlePageChange = (newPage) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: newPage,
    }));
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_ROOT}/api/category/subcatlist`
        );
        const data = await response.json();
        setCategories(data); // Assuming the API response is an array of categories
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  const calculatePageRange = () => {
    const totalPageCount = pagination.totalPages;
    const currentPage = pagination.page;

    const pageRange = 5; // Change this value to set the number of pages to display

    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = startPage + pageRange - 1;

    if (endPage > totalPageCount) {
      endPage = totalPageCount;
      startPage = Math.max(1, endPage - pageRange + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

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

  return (
    <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
      <Row className="clearfix">
        <Col sm={12}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="Filter" className="tabButton" disabled>
                Filter :
              </Nav.Link>
            </Nav.Item>

            {/* Dynamically generate tabs based on fetched data */}
            {categories.slice(0, 7).map((category, index) => (
              <Nav.Item key={index}>
                <Nav.Link
                  eventKey={index}
                  className={`tabButton text-black backgRed ${
                    category.subcat_slug === subcat ? "isActive" : ""
                  }`}
                  href={`/topics/${cat}/${category.subcat_slug}`}
                >
                  {category.subcat_name}
                </Nav.Link>
              </Nav.Item>
            ))}

            <Nav.Item>
              <NavDropdown
                title="More"
                id="nav-dropdown-within-tab"
                className="droptabs text-black colorblack"
              >
                {categories.slice(7).map((category, index) => (
                  <NavDropdown.Item
                    Key="index"
                    className={`colorblack backgRed ${
                      category.subcat_slug === subcat ? "isActive" : ""
                    }`}
                    href={`/topics/${cat}/${category.subcat_slug}`}
                  >
                    {category.subcat_name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav.Item>
          </Nav>
        </Col>

        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className="mainSecondBox mt-4" style={{ gap: "11px" }}>
                {postData.slice(0, 3).map((post) => (
                  <div className="secondBox ">
                    <a href={`/${post.cat_slug}/${post.post_name}`}>
                      <div>
                        <figure>
                          <img
                            style={{
                              width: "100%",
                              borderRadius: "20px",
                              height: "auto",
                              objectFit: "cover",
                            }}
                            src={`${webPath}${post.banner_img}`}
                            alt={post.post_title}
                          />
                        </figure>
                      </div>{" "}
                    </a>
                    <div className="padLR" id="datas">
                      <a href={`/${post.cat_slug}/${post.post_name}`}>
                        <h2 className="fw-bold h5 mt-3 hoverHead line-clamp">
                          {post.post_title}
                        </h2>
                      </a>
                      <p style={{ fontSize: "13px" }}>
                        By <span className="fw-bold">{post.post_author}</span> |{" "}
                        {new Date(post.post_date).toLocaleDateString(
                          undefined,
                          options
                        )}
                      </p>
                      <p
                        className="just-text line-clamp mt-1"
                        style={{ fontSize: "15px" }}
                      >
                        {post.post_title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hr"></div>

              <div className="">
                <div className="row mt-2">
                  <div className="col-md-8">
                    <div>
                      {postData.slice(3, 100).map((post) => (
                        <a href={`/${post.cat_slug}/${post.post_name}`}>
                          {" "}
                          <div
                            key={post.id}
                            className="d-flex mt-3 mb-3 "
                            style={{ alignItems: "center" }}
                          >
                            <div className="quickImgBox">
                              <img
                                style={{ width: "90%", borderRadius: "14px" }}
                                src={`${webPath}${post.banner_img}`}
                                alt={post.post_title}
                              />
                            </div>

                            <div className="" style={{ width: "74%" }}>
                              <h3 className="fw-bold hoverHead quickText h5 line-clamp">
                                {post.post_title}
                              </h3>
                              <p style={{ fontSize: "13px" }}>
                                By{" "}
                                <span className="fw-bold">
                                  {post.post_author}
                                </span>{" "}
                                |{" "}
                                {new Date(post.post_date).toLocaleDateString(
                                  undefined,
                                  options
                                )}
                              </p>
                            </div>
                          </div>
                        </a>
                      ))}

                      <div className="paginationBox mt-5">
                        <a href="#datas" className="mt-1 mb-1">
                          <button
                            className="PaginatinNextBtn"
                            disabled={pagination.page === 1}
                            onClick={() =>
                              handlePageChange(pagination.page - 1)
                            }
                          >
                            <FontAwesomeIcon icon={faAngleLeft} />
                          </button>
                        </a>
                        {calculatePageRange().map((page) => (
                          <span>
                            <button
                              key={page}
                              className={`${
                                pagination.page === page ? "isActives" : ""
                              } fw-bold btn-pagination`}
                              onClick={() => handlePageChange(page)}
                              style={{ cursor: "pointer" }}
                            >
                              {page}
                            </button>
                          </span>
                        ))}

                        <a href="#datas" className="mt-1 mb-1">
                          <button
                            className="PaginatinNextBtn"
                            disabled={pagination.page === pagination.totalPages}
                            onClick={() =>
                              handlePageChange(pagination.page + 1)
                            }
                          >
                            <FontAwesomeIcon icon={faAngleRight} />
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div>
                      {advertisementData && advertisementData.length > 0 && (
                        <a href={`${advertisementData[0].dest_url}`}>
                          {" "}
                          <img
                            style={{ width: "100%" }}
                            src={`${webPath}${advertisementData[0].banner_img}`}
                            alt={advertisementData[0].banner_name}
                          />{" "}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default SelectTab;
