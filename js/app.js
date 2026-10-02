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

  const spanText = document.createElement('span');
  spanText.className = 'task-text';
  spanText.textContent = taskText;

  const btnComplete = document.createElement('button');
  btnComplete.className = 'complete-btn';
  btnComplete.textContent = 'Complete';

  const btnEdit = document.createElement('button');
  btnEdit.className = 'edit-btn';
  btnEdit.textContent = 'Edit';

  const btnRemove = document.createElement('button');
  btnRemove.className = 'remove-btn';
  btnRemove.textContent = 'Remove';

  li.append(spanText, btnComplete, btnEdit, btnRemove);
  return li;
}

function addTask(taskText) {
  if (!taskText || taskText.trim() === '') {
    taskMessage.textContent = 'Task cannot be empty';
    return;
  }
  taskMessage.textContent = '';
  taskText = taskText.trim();

  const taskId = taskIdCounter++;
  const taskEl = createTaskElement(taskText, taskId);
  taskList.appendChild(taskEl);
  updateTaskCounts();
}

function toggleTaskComplete(taskItem) {
  taskItem.classList.toggle('completed');
  const currentState = taskItem.dataset.state;
  taskItem.dataset.state = currentState === 'pending' ? 'completed' : 'pending';
  updateTaskCounts();
}

function beginTaskEdit(taskItem) {
  const spanText = taskItem.querySelector('.task-text');
  const currentText = spanText.textContent;

  const input = document.createElement('input');
  input.className = 'edit-input';
  input.type = 'text';
  input.value = currentText;

  spanText.replaceWith(input);

  const editBtn = taskItem.querySelector('.edit-btn');
  editBtn.textContent = 'Save';
}

function saveTaskEdit(taskItem) {
  const input = taskItem.querySelector('.edit-input');
  const newText = input.value.trim();

  if (!newText) {
    taskMessage.textContent = 'Task cannot be empty';
    return;
  }
  taskMessage.textContent = '';

  const spanText = document.createElement('span');
  spanText.className = 'task-text';
  spanText.textContent = newText;

  input.replaceWith(spanText);

  const editBtn = taskItem.querySelector('.edit-btn');
  editBtn.textContent = 'Edit';
}

function removeTask(taskItem) {
  taskItem.remove();
  updateTaskCounts();
}

function updateTaskCounts() {
  const allTasks = taskList.querySelectorAll('.task-item');
  const total = allTasks.length;
  let pending = 0, completed = 0;

  allTasks.forEach(task => {
    if (task.dataset.state === 'completed') completed++;
    else pending++;
  });

  totalCountEl.textContent = total;
  pendingCountEl.textContent = pending;
  completedCountEl.textContent = completed;
}

function handleTaskListClick(event) {
  const target = event.target;
  const taskItem = target.closest('.task-item');
  if (!taskItem) return;

  if (target.classList.contains('complete-btn')) {
    toggleTaskComplete(taskItem);
  } else if (target.classList.contains('edit-btn')) {
    if (target.textContent.trim() === 'Edit') {
      beginTaskEdit(taskItem);
    } else {
      saveTaskEdit(taskItem);
    }
  } else if (target.classList.contains('remove-btn')) {
    removeTask(taskItem);
  }
}

function loadSampleTasks() {
  const fragment = document.createDocumentFragment();

  const t1 = createTaskElement('Finish Module 4', taskIdCounter++);
  const t2 = createTaskElement('Practice DOM selectors', taskIdCounter++);
  const t3 = createTaskElement('Study event delegation', taskIdCounter++);

  fragment.append(t1, t2, t3);
  taskList.appendChild(fragment);

  updateTaskCounts();
}

addTaskBtn.addEventListener('click', () => {
  addTask(taskInput.value);
  taskInput.value = '';
});

loadSamplesBtn.addEventListener('click', loadSampleTasks);

taskList.addEventListener('click', handleTaskListClick);