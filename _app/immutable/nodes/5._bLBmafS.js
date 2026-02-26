import"../chunks/DsnmJJEf.js";import{i as Y}from"../chunks/DFzlu-Xx.js";import{o as J}from"../chunks/_9Q8be-N.js";import{a0 as R,h as E,k as S,aA as Q,aB as X,v as C,C as K,Y as Z,aC as ee,aD as te,aE as D,i as ae,aF as ne,aG as oe,aH as se,j as z,$ as ie,aI as $,aJ as re,a6 as p,ag as le,a1 as y,a2 as de,g as t,aK as ce,a3 as b,s as B,a4 as pe,u as h,m as q,a5 as s,a7 as o,ad as M,a8 as he}from"../chunks/CLOYZyRZ.js";import{i as ue}from"../chunks/BFG_waxo.js";import{e as me,i as fe}from"../chunks/ClBChGhY.js";import{h as ge}from"../chunks/CBF5MjQE.js";import{s as ve,a as ye}from"../chunks/1GAEMH92.js";import{p as be}from"../chunks/RWo8R5qI.js";function G(w,T,r=!1,d=!1,x=!1){var l=w,e="";R(()=>{var c=Q;if(e===(e=T()??"")){E&&S();return}if(c.nodes!==null&&(X(c.nodes.start,c.nodes.end),c.nodes=null),e!==""){if(E){C.data;for(var n=S(),f=n;n!==null&&(n.nodeType!==K||n.data!=="");)f=n,n=Z(n);if(n===null)throw ee(),te;D(C,f),l=ae(n);return}var _=r?oe:d?se:void 0,u=ne(r?"svg":d?"math":"template",_);u.innerHTML=e;var a=r||d?u:u.content;if(D(z(a),a.lastChild),r||d)for(;z(a);)l.before(z(a));else l.before(a)}})}const we=()=>[{slug:"running-llms-on-edge"},{slug:"triton-inference-server-guide"},{slug:"openvino-vs-tensorrt"}],Te=!0,Ee=Object.freeze(Object.defineProperty({__proto__:null,entries:we,prerender:Te},Symbol.toStringTag,{value:"Module"}));var _e=b('<span class="tag"> </span>'),Ie=b('<main class="svelte-1teoznn"><a href="/blog" class="back-link svelte-1teoznn">← Back to blog</a> <article><header class="svelte-1teoznn"><div class="post-meta svelte-1teoznn"><span> </span> <span class="dot svelte-1teoznn">·</span> <span> </span></div> <h1 class="svelte-1teoznn"><!></h1> <div class="post-tags svelte-1teoznn"></div></header> <div class="divider-line svelte-1teoznn"></div> <div class="post-body svelte-1teoznn"><!></div> <div class="post-footer svelte-1teoznn"><a href="/blog" class="btn btn-ghost">← All posts</a></div></article></main>'),ke=b(`<main class="not-found svelte-1teoznn"><h1 class="svelte-1teoznn">Post not found</h1> <p>This post doesn't exist yet. <a href="/blog" class="svelte-1teoznn">Back to blog →</a></p></main>`),Oe=b('<div id="prog-bar" class="svelte-1teoznn"></div> <!>',1);function Se(w,T){ie(T,!1);const r=()=>ye(be,"$page",d),[d,x]=ve(),l=q(),e=q(),c={"running-llms-on-edge":{title:"Running LLMs at the Edge: Lessons from Building an Offline Voice Agent",date:"February 10, 2025",readTime:"7 min",tags:["LLM","Edge AI","Ollama"],content:`
<p>When I started building the Minecraft voice agent, I had one hard constraint: it needed to work entirely offline. No OpenAI API calls, no cloud inference, no internet required at runtime. Just a local machine, a microphone, and a game running on the same box.</p>

<p>That constraint forced me to deeply understand what's actually possible with local LLMs in 2024 — and the answer is: <strong>a lot more than most people think.</strong></p>

<h2>The Stack I Ended Up With</h2>

<p>The final architecture looks like this: speech-to-text via a local Whisper model, speaker diarization to identify who's speaking, Qdrant for fast vector lookup of known speakers, and Ollama to run the command-to-action LLM pipeline. All on consumer hardware.</p>

<pre><code># Rough pipeline sketch
audio_input → whisper_stt → speaker_diarization
              ↓
         qdrant_lookup (who is this speaker?)
              ↓
         ollama_llm (what action does this map to?)
              ↓
         mineflayer_api (execute in-game)</code></pre>

<h2>Choosing the Right Model for Constrained Hardware</h2>

<p>The biggest lesson: <strong>don't start with the biggest model that fits in VRAM.</strong> Start with the smallest model that can reliably do the task, then scale up only if needed. For command-to-API mapping, a 7B parameter model with a well-designed prompt beats a 70B model with a lazy one every time.</p>

<p>Ollama makes model swapping trivial — you swap a single string and get a completely different model. I went through about eight models before landing on the right size/accuracy tradeoff for this specific task.</p>

<blockquote>"The offline constraint wasn't a limitation. It was a design principle that forced better engineering decisions."</blockquote>

<h2>The Qdrant Trick for Speaker Identity</h2>

<p>Speaker diarization tells you <em>that</em> there are different speakers — it doesn't tell you <em>who</em> they are. To make the agent speaker-aware (so it responds differently to different people), I stored speaker embeddings in Qdrant and did fast cosine similarity lookup at runtime. The whole lookup takes under 5ms.</p>

<p>This same pattern is applicable to tons of edge AI scenarios: fast, local semantic search as a memory system, without needing any cloud infrastructure.</p>

<h2>What I'd Do Differently</h2>

<p>The main thing I underestimated was latency perception. A 1.5 second end-to-end response time feels fine on a benchmark, but feels sluggish in a game where you're expecting instant feedback. I'd invest more time in reducing perceived latency — streaming responses, partial execution of actions while the LLM is still generating, etc.</p>

<p>Overall though, building fully offline AI systems is more accessible than ever. If you're still routing everything through cloud APIs, it's worth asking whether you actually need to.</p>
      `},"triton-inference-server-guide":{title:"Triton Inference Server: A Practical Production Guide",date:"January 22, 2025",readTime:"10 min",tags:["MLOps","Triton","Production"],content:`
<p>Most Triton tutorials show you how to get a single ResNet50 serving requests on your laptop. That's fine for learning. But when you're running 6 different models simultaneously across 30 camera feeds in a production surveillance system, the tricky parts are very different.</p>

<p>Here's what I actually needed to know that I couldn't find in a single place.</p>

<h2>Model Repository Structure Matters More Than You Think</h2>

<p>Triton's model repository isn't just a folder of model files. It's a configuration system. Getting the directory structure and config.pbtxt files right upfront saves hours of debugging.</p>

<pre><code>model_repository/
├── face_detector/
│   ├── 1/
│   │   └── model.onnx
│   └── config.pbtxt
├── reid_model/
│   ├── 1/
│   │   └── model.plan  # TensorRT engine
│   └── config.pbtxt
└── superresolution/
    ├── 1/
    │   └── model.savedmodel/
    └── config.pbtxt</code></pre>

<h2>Dynamic Batching Is Your Friend</h2>

<p>For a multi-camera system, you're getting inference requests at irregular intervals from many sources simultaneously. Triton's dynamic batching groups those requests and runs them as a single batch — dramatically improving GPU utilization without adding latency from an orchestration perspective.</p>

<p>The key config parameters are <code>max_queue_delay_microseconds</code> and <code>preferred_batch_size</code>. Tune these based on your latency SLO, not blindly.</p>

<h2>When Things Go Wrong</h2>

<p>The hardest part of Triton in production is debugging failures. Models can fail at load time, at warmup, or under specific input shapes. My debugging checklist: check the server logs (not just client errors), verify input/output tensor names match exactly, and test with the perf_analyzer tool before going live.</p>

<p>One specific gotcha: ONNX models exported from PyTorch often have dynamic axes that Triton handles differently than you'd expect. Always set explicit shapes in config.pbtxt rather than relying on dynamic shape inference.</p>
      `},"openvino-vs-tensorrt":{title:"OpenVINO vs TensorRT: A Real-World Comparison",date:"November 14, 2024",readTime:"9 min",tags:["Inference","OpenVINO","TensorRT"],content:`
<p>The smartphone testing robot I built at Griffyn Robotech had an unusual constraint: it needed to run the same model stack on both Intel CPU/iGPU-based edge devices AND NVIDIA GPU servers, depending on where it was deployed. That meant I had to get serious about both OpenVINO and TensorRT at the same time.</p>

<p>Here's what I found.</p>

<h2>The Short Version</h2>

<p>TensorRT wins on raw throughput if you have NVIDIA hardware. OpenVINO wins on versatility and ease of use, especially for edge deployment on Intel silicon. Neither is universally better.</p>

<h2>The Conversion Pipeline Differences</h2>

<p>Both tools require converting your original PyTorch/TensorFlow model. TensorRT goes through ONNX first, then compiles to a platform-specific .plan file. OpenVINO uses its Model Optimizer (now part of OpenVINO Runtime) to create an IR (Intermediate Representation) format.</p>

<p>The crucial difference: TensorRT engine files are tied to a specific GPU and CUDA version. You can't build on your dev machine and deploy to production without rebuilding. OpenVINO IR files are more portable within the Intel ecosystem.</p>

<h2>Precision and Accuracy</h2>

<p>Both support INT8 quantization. TensorRT's calibration is more involved but gives better results in my experience. OpenVINO's Post-Training Optimization Toolkit is easier to use but occasionally produces models with noticeable accuracy drops on complex tasks like fine-grained segmentation.</p>

<p>For our defect segmentation model, we saw a 2% accuracy drop with OpenVINO INT8 that wasn't acceptable. We ended up running FP16 on Intel hardware instead, which was a reasonable tradeoff.</p>

<h2>My Recommendation</h2>

<p>If you're deploying only on NVIDIA hardware and throughput is critical: TensorRT. If you're deploying to Intel edge devices or need hardware flexibility: OpenVINO. If you need both like I did: build abstraction layers and support both backends.</p>
      `}};J(()=>{const a=document.getElementById("prog-bar");if(!a)return;const i=()=>{const g=document.body.scrollHeight-window.innerHeight;a.style.width=`${window.scrollY/g*100}%`};return window.addEventListener("scroll",i),()=>window.removeEventListener("scroll",i)}),$(()=>r(),()=>{B(l,r().params.slug)}),$(()=>t(l),()=>{B(e,c[t(l)])}),re(),Y();var n=Oe();ge("1teoznn",a=>{ce(()=>{pe.title=`${t(e),h(()=>t(e)?t(e).title:"404")??""} — Sahitya Madipalli`})});var f=p(le(n),2);{var _=a=>{var i=Ie(),g=p(s(i),2),I=s(g),k=s(I),O=s(k),H=s(O,!0);o(O);var P=p(O,4),F=s(P);o(P),o(k);var N=p(k,2),W=s(N);G(W,()=>(t(e),h(()=>t(e).title.replace(/(.+)/,A=>{const v=A.split(" "),m=v.splice(-2).join(" ");return v.join(" ")+" <em>"+m+"</em>"})))),o(N);var L=p(N,2);me(L,5,()=>(t(e),h(()=>t(e).tags)),fe,(A,v)=>{var m=_e(),U=s(m,!0);o(m),R(()=>M(U,t(v))),y(A,m)}),o(L),o(I);var V=p(I,4),j=s(V);G(j,()=>(t(e),h(()=>t(e).content))),o(V),he(2),o(g),o(i),R(()=>{M(H,(t(e),h(()=>t(e).date))),M(F,`${t(e),h(()=>t(e).readTime)??""} read`)}),y(a,i)},u=a=>{var i=ke();y(a,i)};ue(f,a=>{t(e)?a(_):a(u,!1)})}y(w,n),de(),x()}export{Se as component,Ee as universal};
