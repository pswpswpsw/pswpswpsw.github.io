---
layout: archive
permalink: /
title: "Biography"
excerpt: "Shaowu Pan"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Currently I am a fourth year Ph.D. student in the [Aerospace Engineering](https://aero.engin.umich.edu/) and [Scientific Computing](https://micde.umich.edu/ph-d-in-scientific-computing/) at the [MICDE](https://micde.umich.edu/) at University of Michigan, Ann Arbor, USA, working with [Professor Karthik Duraisamy](https://aero.engin.umich.edu/people/karthik-duraisamy/) since 2016. 
Previously I was a master student working with [Professor Eric Johnsen](http://www-personal.umich.edu/~ejohnsen/) on direct numerical simulation for compressible turbulence. 

<!---
Previously,
* In 2013-2014, I was a research engineer intern in the [Advanced Micro-Fabrication Equipment Inc.](http://www.amec-inc.com/) in Shanghai, China, working with [Dr. Ning Zhou](https://www.linkedin.com/in/ning-zhou-58881b57/). 

* In 2014-2015, I was a M.S.E. student and very fortunate to work with [Professor Eric Johnsen](http://www-personal.umich.edu/~ejohnsen/) on direct numerical simulation for compressible turbulence. 

* In 2016, I was an application engineer intern in the [Exa Corporation](https://www.exa.com/) working with [Adrien Mann](https://www.linkedin.com/in/adrienmann/).



# Education

* __Ph.D.__ in Aerospace Engineering and Scientific Computing, University of Michigan, Ann Arbor, 2020 (expected)
* __M.S.E.__ in Mechanical Engineering, University of Michigan, Ann Arbor, 2015
* __B.S.__ in Applied Mathematics, Beihang University, 2013
* __B.E.__ in Aerospace Engineering, Beihang University, 2013

---> 


# Research Interests

<img src='/images/libre_office_draw_research_graph.png' align="right" width="350" height="200" style="vertical-align:middle;margin:0px 30px"> My research interest lies in __turbulence physics & machine learning__ with a combination of __high-fidelity simulation__ for compressible turbulence with high performance computing,  theoretical & computational understanding on data-driven __predictive reduced-order-modeling (ROM)__ for high-dimensional nonlinear dynamical systems, and __physics-informed data-driven model__ with uncertainty quantification. Such applications include

* High-fidelity simulation of compressible turbulence
* Modeling closure with memory effect for Reduced Order Model (e.g., Large-eddy simulation)
* Modal analysis for multi-scale problem in fluid dynamics
* Optimal control of nonlinear dynamical system using Koopman operator


<!---* Physics-based computational/data-driven modelling
* High fidelity direct numerical simulation (DNS) of compressible turbulence
* Rarefied gas dynamics, direct simulation Monte Carlo (DSMC)
-->
<!---
# Work Experiences

* 2016 Sep - present: Graduate Research Assistant
  * [Computational Aerosciences Laboratory](http://umich.edu/~caslab/), University of Michigan, Ann Arbor
  * Supervisor: [Prof. Karthik Duraisamy](https://aero.engin.umich.edu/people/karthik-duraisamy/)

* 2016 Jan - 2016 July: Application Engineer Intern
  * [Exa Corporation](https://www.exa.com/)
  * Supervisor: [Mr. Adrien Mann](https://www.linkedin.com/in/adrienmann/)

* 2014 Mar - 2014 July: Research Engineer Intern
  * [Advanced Micro-Fabrication Equipment Inc.](http://www.amec-inc.com/) 
  * Supervisor: [Dr. Ning Zhou](https://www.linkedin.com/in/ning-zhou-58881b57/)
-->
<!---
 # Tools

* Programming: Fortran, Python, Cython, C++, Matlab
* HPC: HDF, MPI, OpenMP
* Data analytics: Keras/Tensorflow, scikit-learn
* Data processing: Hive, Pig
* Data visualization tools: Paraview, Tecplot, Visit
-->

<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {box-sizing: border-box;}
body {font-family: Verdana, sans-serif;}
.mySlides {display: none;}
img {vertical-align: middle;}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .text {font-size: 11px}
}
</style>
</head>
<body>

<h2>Automatic Slideshow</h2>
<p>Change image every 2 seconds:</p>

<div class="slideshow-container">

<div class="mySlides fade">
  <div class="numbertext">1 / 3</div>
  <img src="./images/libre_office_draw_research_graph.png" style="width:100%">
  <div class="text">Caption Text</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">2 / 3</div>
  <img src="./images/libre_office_draw_research_graph.png" style="width:100%">
  <div class="text">Caption Two</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">3 / 3</div>
  <img src="./images/libre_office_draw_research_graph.png" style="width:100%">
  <div class="text">Caption Three</div>
</div>

</div>
<br>

<div style="text-align:center">
  <span class="dot"></span> 
  <span class="dot"></span> 
  <span class="dot"></span> 
</div>

<script>
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
</script>

</body>
</html> 