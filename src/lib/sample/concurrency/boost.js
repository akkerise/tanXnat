'use strict';

/**
 * Used for executing tasks concurrently
 *
 * enqueue function
 * - Return a promise which will be executed
 *
 * @param {integer}   numConcurrentTasks   Number of concurrent tasks
 * @param {function}  getTask              Function will be called to enqueue task, will return any available task
 *
 * @return {object}
 */
const run = async (numConcurrentTasks, getTask) => {
  // TO DO: Implement this function to process tasks concurrently
  // For example, if there are 10 tasks in total and there should be 3 concurrently tasks:
  // - At the fist step: the task 1, 2, 3 must start immediately.
  // - If any task is done, the next task musts start immediately.
  // - After the last task starts, there must be no more queueing up.
};

/**
 * This function is used to stimulate task processing time
 */
const waitFor = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
};

/**
 * Main
 */
const main = async () => {
  const startedAt = Date.now();

  // Define 10 tasks, task i_th would take i*2 seconds to finish
  const tasks = [];
  for (let i = 1; i <= 10; i++) {
    const task = async () => {
      console.log(`Task ${i} started, done in ${i * 2}s`);
      await waitFor(i * 2000);
      console.log(`Task ${i} DONE!`);
    };
    tasks.push(task);
  }

  console.log('Processing 3 tasks concurrently');
  // Run 3 tasks concurrently
  await run(3, () => {
    // Shift one task from the list, this task should be queued up for processing
    const task = tasks.shift();
    if (!task) return;

    // return the task for queueing
    return task;
  });
  console.log(`DONE after ${Date.now() - startedAt}ms`)
};

main().catch(e => console.log(e.stack));

// Requirement 1: The console log should show as below if there are 3 concurrent tasks:

//  taskQueueProcessor() START, processing 3 tasks concurrently
//  Task 1 started, done in 2s
//  Task 2 started, done in 4s
//  Task 3 started, done in 6s
//  Task 1 DONE!
//  Task 4 started, done in 8s
//  Task 2 DONE!
//  Task 5 started, done in 10s
//  Task 3 DONE!
//  Task 6 started, done in 12s
//  Task 4 DONE!
//  Task 7 started, done in 14s
//  Task 5 DONE!
//  Task 8 started, done in 16s
//  Task 6 DONE!
//  Task 9 started, done in 18s
//  Task 7 DONE!
//  Task 10 started, done in 20s
//  Task 8 DONE!
//  Task 9 DONE!
//  Task 10 DONE!
//  DONE after 44469ms

// Requirement 2: The whole processing time should be no longer than 50s, for a 3 concurrent tasks
