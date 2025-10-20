'use client';
import { AnimationControls, motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import { sleep } from '../lib/sleep';

const list = {
  visible: {
    display: 'flex',
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
  hidden: {
    display: 'none',
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
};

export default function AnimatedTitle() {
  const fullStack = useAnimationControls();
  const cybersecurity = useAnimationControls();
  const aiMl = useAnimationControls();

  useEffect(() => {
    let hasCanceled_ = false;
    const animationActions = [
      { controller: aiMl as AnimationControls, value: 'visible' },
      { controller: aiMl, value: 1000 },
      { controller: aiMl, value: 'hidden' },
      { controller: aiMl, value: 700 },
      { controller: fullStack, value: 'visible' },
      { controller: fullStack, value: 1000 },
      { controller: fullStack, value: 'hidden' },
      { controller: fullStack, value: 700 },
      { controller: cybersecurity, value: 'visible' },
      { controller: cybersecurity, value: 1000 },
      { controller: cybersecurity, value: 'hidden' },
      { controller: cybersecurity, value: 700 },
    ];

    const animateWords = async () => {
      for (const action of animationActions) {
        if (hasCanceled_) {
          return;
        }
        if (typeof action.value === 'number') {
          await sleep(action.value);
        } else if (!hasCanceled_) {
          await action.controller.start(action.value);
        }
      }
      animateWords();
    };
    animateWords();
    return () => {
      hasCanceled_ = true;
    };
  }, [fullStack, cybersecurity, aiMl]);

  return (
    <div className="flex text-blue-100">
      <motion.div variants={list} initial="hidden" animate={aiMl}>
        <WriteWord word="AI/ML" />
      </motion.div>
      <div className="text-transparent">a</div>
      <motion.div variants={list} initial="hidden" animate={fullStack}>
        <WriteWord word="Full-Stack" />
      </motion.div>
      <motion.div variants={list} initial="hidden" animate={cybersecurity}>
        <WriteWord word="Cybersecurity" />
      </motion.div>
    </div>
  );
}

const item = {
  hidden: { display: 'none', x: 0 },
  visible: { display: 'flex', x: 0 },
};

function WriteWord({ word, ...props }: React.ComponentPropsWithoutRef<typeof motion.div> & { word: string }) {
  return word.split('').map((letter, index) => (
    <motion.div key={index} variants={item} {...props}>
      {letter}
    </motion.div>
  ));
}
