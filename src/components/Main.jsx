import { useState } from 'react'

const Main = () => {
	// 1. Состояние с задачами
	const [tasks, setTasks] = useState([])

	// 2. Состояние для инпута
	const [newTask, setNewTask] = useState('')

	// 3. Функция добавления задачи
	const addTask = () => {
		if (newTask.trim() === '') return

		const newTaskObj = {
			id: Date.now(), // уникальный id
			text: newTask,
			time: new Date()
				.toLocaleString('ru-RU', {
					hour: '2-digit',
					minute: '2-digit',
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
				})
				.replace(',', ' AM/PM?'), // тут подгони под свой формат
		}

		setTasks([...tasks, newTaskObj])
		setNewTask('')
	}

	// 4. Функция удаления задачи
	const deleteTask = id => {
		setTasks(tasks.filter(task => task.id !== id))
	}

	return (
		<main className='flex-1 flex justify-center px-4 py-6 md:px-10'>
			<div className='w-full max-w-2xl flex flex-col gap-6'>
				{/* Форма добавления задачи */}
				<div className='flex gap-2'>
					<input
						type='text'
						value={newTask}
						onChange={e => setNewTask(e.target.value)}
						placeholder='Новая задача...'
						className='flex-1 p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400'
						onKeyPress={e => e.key === 'Enter' && addTask()}
					/>
					<button
						onClick={addTask}
						className='bg-[#07393c] text-white px-6 py-3 rounded-2xl hover:opacity-90 transition'
					>
						Добавить
					</button>
				</div>

				{/* Список задач */}
				<div className='flex-1 overflow-y-auto' style={{ minHeight: '300px' }}>
					{tasks.length > 0 ? (
						<ul className='space-y-3'>
							{tasks.map(task => (
								<li
									key={task.id}
									className='bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-start'
								>
									<div>
										<p className='text-lg font-medium'>{task.text}</p>
										<p className='text-sm text-gray-500'>{task.time}</p>
									</div>
									<button
										onClick={() => deleteTask(task.id)}
										className='text-red-500 hover:text-red-700 text-xl px-2'
									>
										×
									</button>
								</li>
							))}
						</ul>
					) : (
						<div className='h-full flex items-center justify-center text-gray-400'>
							Нет задач. Добавьте первую!
						</div>
					)}
				</div>
			</div>
		</main>
	)
}

export default Main
