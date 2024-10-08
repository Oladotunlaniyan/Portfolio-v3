import React, { useState, useEffect, forwardRef } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { works } from '../../Data.js';
import './Work.scss';

const Work = forwardRef(function Work(props, ref) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [filterWork, setFilterWork] = useState([]);

  const tabs = ['HTML', 'React JS', 'All'];

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.stacks.includes(item)));
      }
    }, 500);
  };

  useEffect(() => {
    setFilterWork(works);
  }, []);

  return (
    <div id='work' className='app__container app__wrapper app__flex'>
      <motion.div
        ref={ref}
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='head-text'>
          My<span> Projects </span>
        </h2>
        <div className="app__work-filter">
          {tabs.map((item, index) => (
            <div 
              key={index} 
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>
        <motion.div
          animate={animateCard}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className='app__work-portfolio'
        >
          {filterWork.map((work, index) => (
            <div key={index} className='app__work-item app__flex'>
              <div className="app__work-img app__flex">
                <img src={work.imgUrl} alt={work.name} />

                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                  className='app__work-hover app__flex'
                >
                  <a href={work.projectLink} target='_blank' rel='noreferrer'>
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className='app__flex'
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>
                  <a href={work.codeLink} target='_blank' rel='noreferrer'>
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className='app__flex'
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                </motion.div>
              </div>
              <div className='app__work-content app__flex'>
                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>
                <div className='p-text stack'>Stack/Tools:
                  {work.stacks.map((stack, index) => (
                    <span key={index}> {stack},</span>
                  ))}
                </div>
                <div className='mobile-links'>
                  <a href={work.projectLink} target='_blank' rel='noreferrer'>
                    <FiExternalLink />
                  </a>
                  <a href={work.codeLink} target='_blank' rel='noreferrer'>
                    <AiFillGithub />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
});

export default Work;
