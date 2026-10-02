let taskIdCounter = 1;

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const loadSamplesBtn = document.getElementById('loadSamplesBtn');
const taskList = document.getElementById('taskList');
const taskMessage = document.getElementById('taskMessage');
const totalCountEl = document.getElementById('totalCount');
const pendingCountEl = document.getElementById('pendingCount');
const completedCountEl = document.getElementById('completedCount');

function createTaskElement(taskText, taskId) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.taskId = `task-${taskId}`;
  li.dataset.state = 'pending';

  const span = Object.assign(document.createElement('span'), {
    className: 'task-text',
    textContent: taskText
  });
  const btnC = Object.assign(document.createElement('button'), {
    className: 'complete-btn',
    textContent: 'Complete'
  });
  const btnE = Object.assign(document.createElement('button'), {
    className: 'edit-btn',
    textContent: 'Edit'
  });
  const btnR = Object.assign(document.createElement('button'), {
    className: 'remove-btn',
    textContent: 'Remove'
  });

  li.append(span, btnC, btnE, btnR);
  return li;
}

function addTask(taskText) {
  if (!taskText.trim()) {
    taskMessage.textContent = 'Task cannot be empty';
    return;
  }
  taskMessage.textContent = '';
  taskList.appendChild(createTaskElement(taskText.trim(), taskIdCounter++));
  updateTaskCounts();
}

function toggleTaskComplete(taskItem) {
  taskItem.classList.toggle('completed');
  taskItem.dataset.state = taskItem.dataset.state === 'pending' ? 'completed' : 'pending';
  updateTaskCounts();
}

function beginTaskEdit(taskItem) {
  const span = taskItem.querySelector('.task-text');
  const input = Object.assign(document.createElement('input'), {
    className: 'edit-input',
    type: 'text',
    value: span.textContent
  });
  span.replaceWith(input);
  taskItem.querySelector('.edit-btn').textContent = 'Save';
}

function saveTaskEdit(taskItem) {
  const input = taskItem.querySelector('.edit-input');
  if (!input.value.trim()) {
    taskMessage.textContent = 'Task cannot be empty';
    return;
  }
  taskMessage.textContent = '';
  const span = Object.assign(document.createElement('span'), {
    className: 'task-text',
    textContent: input.value.trim()
  });
  input.replaceWith(span);
  taskItem.querySelector('.edit-btn').textContent = 'Edit';
  updateTaskCounts();
}

function removeTask(taskItem) {
  taskItem.remove();
  updateTaskCounts();
}

function updateTaskCounts() {
  const tasks = taskList.querySelectorAll('.task-item');
  const total = tasks.length;
  const completed = [...tasks].filter(t => t.dataset.state === 'completed').length;
  totalCountEl.textContent = total;
  pendingCountEl.textContent = total - completed;
  completedCountEl.textContent = completed;
}

function handleTaskListClick(event) {
  const taskItem = event.target.closest('.task-item');
  if (!taskItem) return;

  if (event.target.classList.contains('complete-btn')) toggleTaskComplete(taskItem);
  else if (event.target.classList.contains('edit-btn')) {
    event.target.textContent === 'Edit' ? beginTaskEdit(taskItem) : saveTaskEdit(taskItem);
  }
  else if (event.target.classList.contains('remove-btn')) removeTask(taskItem);
}

function loadSampleTasks() {
  const frag = document.createDocumentFragment();
  frag.append(
    createTaskElement('Finish Module 4', taskIdCounter++),
    createTaskElement('Practice DOM selectors', taskIdCounter++),
    createTaskElement('Study event delegation', taskIdCounter++)
  );
  taskList.appendChild(frag);
  updateTaskCounts();
}

addTaskBtn.addEventListener('click', () => {
  addTask(taskInput.value);
  taskInput.value = '';
});
loadSamplesBtn.addEventListener('click', loadSampleTasks);
taskList.addEventListener('click', handleTaskListClick);
