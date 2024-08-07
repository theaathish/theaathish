"use strict";

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// Navbar variables
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Navbar link click handler
navbarLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navbarLinks.forEach((nav) => nav.classList.remove("active"));
    link.classList.add("active");
    pages.forEach((page) => page.classList.remove("active"));
    const pageId = link.textContent.trim().toLowerCase();
    document.querySelector(`[data-page="${pageId}"]`).classList.add("active");
  });
});

// Testimonials modal functionality (if needed)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modal = document.querySelector("[data-modal]");
const closeModalBtn = document.querySelector("[data-modal-close]");

// Testimonials item click handler
if (testimonialsItem.length && modal && closeModalBtn) {
  testimonialsItem.forEach((item) => {
    item.addEventListener("click", function () {
      elementToggleFunc(modal);
    });
  });

  closeModalBtn.addEventListener("click", function () {
    elementToggleFunc(modal);
  });
}

// Form submission handling
const form = document.querySelector("[data-form]");
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Form submitted!");
  });
}

const apiUrl = 'https://script.google.com/macros/s/AKfycbwYxzDH_m6sBi8SXnvkmCq1BwiJrgFyEWyqvWtaDdTPsGx_Fb6rZ7sQjb5TjuJOEOOGbA/exec'; // Replace with your Web App URL

async function fetchBlogPosts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

function createBlogPostElement(post) {
  return `
    <li class="blog-post-item">
      <a href="#">
        <figure class="blog-banner-box">
          <img src="${post['Image URL']}" alt="${post['Title']}" loading="lazy">
        </figure>
        <div class="blog-content">
          <h3 class="h3 blog-item-title">${post['Title']}</h3>
          <p class="blog-text">${post['Description']}</p>
        </div>
      </a>
    </li>
  `;
}

async function renderBlogPosts() {
  const blogPosts = await fetchBlogPosts();
  const blogPostsList = document.getElementById('blog-posts-list');
  if (blogPostsList) {
    blogPostsList.innerHTML = blogPosts.length ? blogPosts.map(createBlogPostElement).join('') : 'No blog posts available.';
  }
}

document.addEventListener('DOMContentLoaded', renderBlogPosts);
