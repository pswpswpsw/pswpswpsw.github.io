---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

Over the past decades, we have witnessed the success of classic computational paradigm based on first-principle in many physical and engineering disciplines. For example, computational fluid dynamics (CFD) has played a critical role in the application of fluid mechanics, including aerodynamic design of aircraft, combustion simulation. Yet many challenging questions still remain in the modeling and control of complex flow phenomena such as laminar-turbulence transition, noise generation in aeroacoustics. Conventional approaches rely on performing moderate (LES) to high-fidelity simulations (DNS) for insight in design, optimization and control. This cycle that relies on traditional computational science has three issues. 
- First, it involves a prohibitively high computational cost and human effort in the downstream tasks: design, control and validation process (e.g., design of transonic airfoil) or in pursuing accurate models for missing physics (e.g., closure problems). 
- Second, the complex flowfield from high-fidelity simulations is challenging to interpret (e.g., extracting meaningful coherent structures). 
- Third, data from high-fidelity simulations and experiments are not fully exploited (beyond validation). 


**My research is predicated on the synthesis of traditional computational mathematics paradigms with cutting-edge techniques in deep learning to address complex challenges in aerospace engineering.** The methodologies we have developed are not only targeted but also versatile, possessing the potential for application in a variety of other engineering sectors (e.g., nuclear, manufacturing). My scholarly focus is dedicated to rigorously examining the foundational elements of scientific machine learning through a multidisciplinary prism that incorporates applied mathematics, engineering physics, and machine learning disciplines. This comprehensive approach is strategically designed to address intricate nonlinear dynamical systems. Our work is fundamentally anchored in the theories of dynamical systems, deep learning algorithms, optimization techniques, and fluid mechanics.


## Thrust 1: Operator-theoretic Modeling and Control of Nonlinear Dynamical Systems

Classical approach for nonlinear systems follows the geometrical approach to describe the evolution of nonlinear dynamics in the high-dimensional state-space. Alternatively, one can switch the attention to the observable on such state-space. In contrast to classical techniques, Koopman operator seeks a linear embedding of non-linear dynamical systems from high-dimensional data from either sparse experimental measurements of the system. This transforms non-linear systems into linear systems for which closed-form analytical solutions are often available. It renders a control-oriented model for any nonlinear system. As an example of "modeling for control", one can have Koopman-based model predictive control (MPC) which converts a non-linear MPC into a much faster linear counterpart. 


<img src='/images/koopman-overview.png' align="center" width="441" height="256" style="vertical-align:left;margin:0px 30px"> 

In spite of significant strides made in the theoretical exploration of the Koopman operator, the practical aspect of learning this operator from data remains an open question. Over recent years, we have pioneered a range of computational and numerical methods, complemented by theoretical insights, aimed at establishing a more robust and precise framework for learning the Koopman operator from empirical data sets. This multi-pronged approach not only enhances the accuracy of Koopman operator approximations but also fortifies its applicability across diverse scientific and engineering contexts. 


## Thrust 2: Predictive Reduced-Complexity Learning of Nonlinear PDE Systems 

Unlike nonlinear ODE systems, modeling PDE system is more challenging in that one would desire not only an accurate description of the complex, potentially multi-physics process (e.g., fluid-structure interaction) but also developing efficient computational models for many-query situations (e.g., uncertainty quantification, design optimization). Depending on whether the discretization of the governing equation is used during model deployment, one can choose between two families of methods: *intrusive* (e.g., reduced-order modeling, POD-Galerkin, LSPG) or *non-intrusive* (e.g., deep learning/machine learning surrogates, operator inference). While the former one utilizes known governing equations thus has better generalization, the latter has much order of maginitute speed up thus it is preferred for many-query or time-senseitive tasks such as uncertainty quantification and control. 

During the past few years, we have developed several novel techniques ranging from data-driven modeling of closure dynamics, field-inversion machine learning (one of the first few works in differentiable physics learning), mesh-agnostic learning (e.g., neural implicit flow). These techniques are verified against traditional approaches in several challenging problems such as turbulence modeling (RANS) over an airfoil, sparse sensing of dynamically evolving spatial fields, and operator learning even for arbitrary complex geometry (e.g., flow over realisitic car geometry, optimization of compressor airfoil) under adaptive mesh refinement.  

<img src='/images/nif.png' align="center" width="441" height="256" style="vertical-align:left;margin:0px 30px"> 




