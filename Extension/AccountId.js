import{o as i,u as n,j as s}from"./index.js";import{S as o}from"./stringUtil.js";const p=i(({account:e})=>{const{zondStore:a}=n(),{getAccountBalance:c}=a,{prefix:l,addressSplit:r}=o.getSplitAddress(e),x=c(e);return s.jsxs("div",{className:"flex gap-1",children:[s.jsx("div",{className:"text-xs",children:l}),s.jsxs("div",{className:"flex flex-col gap-1",children:[s.jsx("div",{className:"flex flex-wrap gap-1",children:r.map(t=>s.jsx("div",{className:"text-xs",children:t},t))}),s.jsx("div",{className:"text-xs text-secondary",children:x})]})]})});export{p as A};
