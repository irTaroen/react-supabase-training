import NavbarBlog from "../components/NavbarBlog";
import HomeBlog from "../components/HomeBlog";

function PageDojoBlog() {
  return (
    <div className="Blog_dojo">
      <NavbarBlog />
      <div className="content">
        <HomeBlog />
      </div>
    </div>
  );
}

export default PageDojoBlog;
