--
-- PostgreSQL database dump
--

\restrict qle48VysSx7FTxpVX4fLsXcKQiv5doC5MG11r6lw0PMxrsAza5f0DiIy6KgbRm4

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog_posts (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    excerpt text NOT NULL,
    content text NOT NULL,
    image_url text,
    tags text[] DEFAULT '{}'::text[] NOT NULL,
    reading_time integer DEFAULT 5 NOT NULL,
    published_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.blog_posts OWNER TO postgres;

--
-- Name: blog_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blog_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blog_posts_id_seq OWNER TO postgres;

--
-- Name: blog_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blog_posts_id_seq OWNED BY public.blog_posts.id;


--
-- Name: contact_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_messages (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.contact_messages OWNER TO postgres;

--
-- Name: contact_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contact_messages_id_seq OWNER TO postgres;

--
-- Name: contact_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_messages_id_seq OWNED BY public.contact_messages.id;


--
-- Name: experiments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experiments (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    tags text[] DEFAULT '{}'::text[] NOT NULL,
    status text DEFAULT 'prototype'::text NOT NULL,
    type text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.experiments OWNER TO postgres;

--
-- Name: experiments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.experiments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.experiments_id_seq OWNER TO postgres;

--
-- Name: experiments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.experiments_id_seq OWNED BY public.experiments.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    platform text NOT NULL,
    image_url text,
    live_url text,
    tags text[] DEFAULT '{}'::text[] NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_id_seq OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: quote_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quote_requests (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    company text,
    service text NOT NULL,
    budget text,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.quote_requests OWNER TO postgres;

--
-- Name: quote_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quote_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quote_requests_id_seq OWNER TO postgres;

--
-- Name: quote_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quote_requests_id_seq OWNED BY public.quote_requests.id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id integer NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    category text NOT NULL,
    features text[] DEFAULT '{}'::text[] NOT NULL,
    packages jsonb DEFAULT '[]'::jsonb NOT NULL
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.services_id_seq OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: blog_posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts ALTER COLUMN id SET DEFAULT nextval('public.blog_posts_id_seq'::regclass);


--
-- Name: contact_messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_messages ALTER COLUMN id SET DEFAULT nextval('public.contact_messages_id_seq'::regclass);


--
-- Name: experiments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiments ALTER COLUMN id SET DEFAULT nextval('public.experiments_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: quote_requests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quote_requests ALTER COLUMN id SET DEFAULT nextval('public.quote_requests_id_seq'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blog_posts (id, title, slug, excerpt, content, image_url, tags, reading_time, published_at, created_at) FROM stdin;
1	AEO: Why AI Search Visibility Is the New SEO	aeo-ai-search-visibility	ChatGPT, Perplexity, and Google AI Mode are changing how people discover businesses. Here is how to make sure yours gets found.	Answer Engine Optimisation (AEO) is rapidly becoming as important as traditional SEO. As AI-powered search engines like ChatGPT, Perplexity, and Google AI Mode become the primary way people find information, businesses need to adapt their web presence to be discoverable in these new channels. Structured data, entity authority, and schema markup play a critical role in whether your site gets surfaced as a trusted source...	\N	{AEO,SEO,"AI Search",Strategy}	6	2026-08-09 15:10:07.998542+05	2026-08-09 15:10:07.998542+05
2	The Hidden Cost of Slow Websites	hidden-cost-slow-websites	A 1-second delay in page load time can cost you 7% of conversions. We break down the numbers and the fixes.	Page speed is not just a technical metric — it is a revenue metric. Every additional second of load time directly correlates with higher bounce rates and fewer conversions. In this post, we dig into the data and show you exactly how to diagnose and fix the most common performance bottlenecks...	\N	{Performance,"Core Web Vitals",Conversion,Technical}	8	2026-08-09 15:10:07.998542+05	2026-08-09 15:10:07.998542+05
3	Webflow vs WordPress vs Custom: Which Should You Choose?	webflow-vs-wordpress-vs-custom	The platform question is the most important decision in any web project. We break down the tradeoffs so you can choose with confidence.	Choosing the right platform for your website is a decision that will shape your project for years. Each major platform — Webflow, WordPress, and custom development — has genuine strengths and real limitations. The right choice depends on your specific needs, team, and growth trajectory...	\N	{Platforms,Webflow,WordPress,Strategy}	10	2026-08-09 15:10:07.998542+05	2026-08-09 15:10:07.998542+05
4	How We Build Sites That Show Up in ChatGPT	build-sites-chatgpt-visible	Most websites are invisible to AI search engines. We share the exact technical approach we use to make every Deverdex site discoverable in AI Mode.	When someone types a query into ChatGPT or Perplexity, the AI draws from a vast index of web content — but not all content is created equal. Structured data, entity authority, and schema markup play a critical role in whether your site gets surfaced as a trusted source...	\N	{AEO,ChatGPT,Schema,"Technical SEO"}	7	2026-08-09 15:10:07.998542+05	2026-08-09 15:10:07.998542+05
\.


--
-- Data for Name: contact_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact_messages (id, name, email, subject, message, created_at) FROM stdin;
\.


--
-- Data for Name: experiments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.experiments (id, title, slug, description, tags, status, type, created_at) FROM stdin;
1	Foyer: Route the Brief	route-the-brief	Tests whether an AI host can teach visitors how different project needs map to the right delivery path. An interactive game-like briefing tool.	{AI,Game,"Intent Routing"}	prototype	Interactive	2026-08-09 15:10:11.375897+05
2	Scroll Physics Engine	scroll-physics	A custom scroll system with momentum, friction, and spring physics. Built to explore what scroll-driven UI can feel like beyond native browser APIs.	{Animation,Physics,UX}	running	Motion Study	2026-08-09 15:10:11.375897+05
3	Typographic Scale Generator	type-scale	Input a base size and the tool generates a complete modular scale — with live preview across headings, body, and captions in any font.	{Typography,"Design Tools",Generator}	stable	Tool	2026-08-09 15:10:11.375897+05
4	AI Colour Pairing	ai-colour-pairing	Describe a mood or industry and the AI generates a complete colour palette with contrast ratios checked and WCAG compliance built in.	{AI,Colour,Accessibility,"Design Tools"}	prototype	AI Interface	2026-08-09 15:10:11.375897+05
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, title, slug, description, category, platform, image_url, live_url, tags, featured, created_at) FROM stdin;
1	FinTrack Pro Dashboard	fintrack-pro	A comprehensive financial analytics platform with real-time data visualisation, budget tracking, and AI-powered insights for SMEs.	Web Development	React + Node.js	\N	\N	{React,TypeScript,PostgreSQL,Charts}	t	2026-08-09 15:10:04.838711+05
2	Luxe Realty Website	luxe-realty	Premium real estate website with MLS integration, 3D property tours, and a sophisticated search experience that converts browsers into buyers.	Web Design	WordPress	\N	\N	{WordPress,"Web Design",SEO,AEO}	t	2026-08-09 15:10:04.838711+05
3	FoodFly Mobile App	foodfly-app	A food delivery app with real-time order tracking, restaurant discovery, and a seamless checkout flow. Launched on iOS & Android in 3 countries.	Mobile Apps	React Native	\N	\N	{"React Native",Expo,"Maps API",Payments}	t	2026-08-09 15:10:04.838711+05
4	Nova Brand Identity	nova-brand	Complete brand identity system for a fintech startup — logo, type system, colour palette, and comprehensive brand guidelines.	Branding	Figma	\N	\N	{Branding,Figma,"Design System","UI Kit"}	f	2026-08-09 15:10:04.838711+05
5	MediCore Patient Portal	medicore-portal	HIPAA-compliant patient portal with appointment booking, medical records access, and secure messaging between patients and providers.	Web Development	Next.js + Express	\N	\N	{Next.js,HIPAA,Healthcare,Security}	f	2026-08-09 15:10:04.838711+05
6	ArtSpace Gallery Site	artspace-gallery	Immersive online gallery for a contemporary art collective with dynamic collections, artist profiles, and an e-commerce layer for print sales.	Web Design	Webflow	\N	\N	{Webflow,E-commerce,Gallery,Animation}	f	2026-08-09 15:10:04.838711+05
\.


--
-- Data for Name: quote_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quote_requests (id, name, email, company, service, budget, message, created_at) FROM stdin;
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, name, slug, description, icon, category, features, packages) FROM stdin;
4	SEO & AEO	SEO & AEO	Get found in Google AND AI search engines. We build with AEO schema so ChatGPT, Perplexity, and Google AI Mode surface your brand.	Search	marketing	{"Technical SEO audit & fix","AEO schema markup implementation","AI search visibility monitoring","Core Web Vitals optimisation","Content strategy & keyword mapping","Monthly performance reporting"}	[{"name": "SEO Audit", "price": "from $300", "delivery": "3-5 days"}, {"name": "Full SEO Package", "price": "from $800/mo", "delivery": "Ongoing"}, {"name": "AEO Setup", "price": "from $500", "delivery": "7 days"}]
2	Custom Software	custom-software	High-performance custom web apps built with modern stacks. Scalable, secure, and AI-search ready from day one.	Code2	development	{"Custom React & Node.js development","REST API & database design","Authentication & user management","Third-party integrations","Performance optimisation","Ongoing support & maintenance"}	[{"name": "Landing Page", "price": "from $600", "delivery": "5-7 days"}, {"name": "Web App", "price": "from $2,500", "delivery": "21-30 days"}, {"name": "Enterprise Platform", "price": "Custom", "delivery": "60+ days"}]
1	UI/UX Design	web-design	Stunning, conversion-focused websites crafted for your brand. Every pixel earns its place.	Palette	design	{"Custom UI/UX design","Mobile-first responsive layouts","Brand-aligned visual identity","Figma prototypes & wireframes","AEO schema built in","Core Web Vitals optimised"}	[{"name": "Starter Site", "price": "from $800", "delivery": "7-10 days"}, {"name": "Growth Site", "price": "from $1,500", "delivery": "14-21 days"}, {"name": "Enterprise", "price": "Custom", "delivery": "30+ days"}]
3	Maintenance	maintenance	Cross-platform mobile apps for iOS & Android built with React Native & Expo.	Smartphone	mobile	{"iOS & Android from one codebase","Native device APIs & push notifications","Offline-first architecture","App Store & Play Store deployment","CI/CD pipeline setup","Analytics integration"}	[{"name": "MVP App", "price": "from $3,000", "delivery": "30-45 days"}, {"name": "Full Product", "price": "from $8,000", "delivery": "60-90 days"}, {"name": "Enterprise", "price": "Custom", "delivery": "90+ days"}]
\.


--
-- Name: blog_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blog_posts_id_seq', 7, true);


--
-- Name: contact_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_messages_id_seq', 1, false);


--
-- Name: experiments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.experiments_id_seq', 4, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 6, true);


--
-- Name: quote_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quote_requests_id_seq', 1, false);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.services_id_seq', 4, true);


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_unique UNIQUE (slug);


--
-- Name: contact_messages contact_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_messages
    ADD CONSTRAINT contact_messages_pkey PRIMARY KEY (id);


--
-- Name: experiments experiments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiments
    ADD CONSTRAINT experiments_pkey PRIMARY KEY (id);


--
-- Name: experiments experiments_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiments
    ADD CONSTRAINT experiments_slug_unique UNIQUE (slug);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: projects projects_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_slug_unique UNIQUE (slug);


--
-- Name: quote_requests quote_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quote_requests
    ADD CONSTRAINT quote_requests_pkey PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: services services_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_slug_unique UNIQUE (slug);


--
-- PostgreSQL database dump complete
--

\unrestrict qle48VysSx7FTxpVX4fLsXcKQiv5doC5MG11r6lw0PMxrsAza5f0DiIy6KgbRm4

