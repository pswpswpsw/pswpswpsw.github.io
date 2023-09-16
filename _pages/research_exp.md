---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

Over the past decades, we have witnessed the success of classic computational paradigm based on first-principle in many physical and engineering disciplines. For example, computational fluid dynamics (CFD) has played a critical role in the application of fluid mechanics, including aerodynamic design of aircraft, combustion simulation. Yet many challenging questions still remain in the modeling and control of complex flow phenomena such as laminar-turbulence transition, noise generation in aeroacoustics. Conventional approaches rely on performing moderate (LES) to high-fidelity simulations (DNS) for insight in design, optimization and control. This cycle that relies on traditional computational science has three issues. First, it involves a prohibitively high computational cost and human effort in the downstream tasks: design, control & validation process (e.g., design of transonic airfoil) or in pursuing accurate models for missing physics (e.g., closure problems). Second, the complex flowfield from high-fidelity simulations is challenging to interpret (e.g., extracting meaningful coherent structures). Third, data from high-fidelity simulations and experiments are not fully exploited (beyond validation)

I believe blending data either into classical computational paradigm along with developing novel tools from deep learning is the key to address the above issues in aerospace engineering. My work focuses on addressing fundamental issues of scientific machine learning rigorously from a multidisciplinary perspective (e.g., applied math, physical engineering and computer science) and applications towards complex dynamical systems. My work builds on fundamental concepts from dynamical systems, deep learning, optimization, and fluid mechanics.

## Thrust 1: Data-Driven Operator-theoretic Modeling and Control of Nonlinear Dynamical Systems

Koopman operator seeks a linear embedding of non-linear dynamical systems from high-dimensional data from either sparse experimental measurements of the system. This transforms non-linear systems into linear systems for which closed-form analytical solutions are often available. It renders a control-oriented model for any nonlinear system. As an example of "modeling for control", one can have Koopman-based model predictive control (MPC) which converts a non-linear MPC into a much faster linear counterpart. 

## Thrust 2: Physics-Informed Predictive Modeling of PDE systems

