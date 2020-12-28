# Описание пакета
Очень простой и удобный роутер для приложений, использующих в качестве
UI-библиотеки [VKUI](https://github.com/VKCOM/VKUI).

# Установка
```
yarn add @unexp/router
```
или, используя npm:
```
npm i @unexp/router
```

# Быстрый старт
Сначала нужно обернуть приложение в компонент-провайдер ``Router``:
```jsx
import { Router } from '@unexp/router'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
```
Теперь мы можем пользоваться всеми возможностями пакета.
Базовый пример:
```jsx
import { useStructure } from '@unexp/router'

let App = () => {
  let structure = useStructure({
    panel: 'home'
  })

  return (
    <View activePanel={structure.panel}>
      <Home id='home' />
      <Settings id='settings' />
    </View>
  )
}
```
Выглядит довольно просто.

# Структура приложения
В примере выше мы познакомились с хуком ``useStructure``. Вот что нужно про него знать:
- С помощью него определяется структура приложения. 
- Структура приложения может быть определена **лишь один раз**.

# Навигация

### Переход на новое состояние
```jsx
import { useRouter } from '@unexp/router'

let Home = () => {
  let { push } = useRouter()

  return (
    <Panel id='home'>
      <PanelHeader>ВКонтакте</PanelHeader>
      <Button onClick={() => push({ panel: 'settings' })}>
        Перейти к настройкам
      </Button>
    </Panel>
  )
}
```
С помощью метода ``push`` хука ``useRouter`` вы можете добавлять новое состояние
навигации в историю. В примере выше при нажатии на кнопку пользователь перейдёт на
панель с настройками.

### Возврат назад
```jsx
import { useRouter } from '@unexp/router'

let Settings = () => {
  let { back } = useRouter()

  return (
    <Panel id='settings'>
      <PanelHeader left={<PanelHeaderBack onClick={back} />}>
        Настройки
      </PanelHeader>
    </Panel>
  )
}
```
При вызове метода ``back`` происходит возврат на прошлое состояние навигации.

### Замена текущего состояния
Иногда может потребоваться **заменить** текущее состояние навигации на другое. 
Специально для этого ``useRouter`` предоставляет метод ``replace``. 
```jsx
import { useRouter } from '@unexp/router'

let Home = () => {
  let { replace } = useRouter()

  return (
    <Panel id='home'>
      <PanelHeader>ВКонтакте</PanelHeader>
      <Button onClick={() => replace({ panel: 'settings' })}>
        Заменить текущую панель на панель с настройками
      </Button>
    </Panel>
  )
}
```
API этого метода полностью повторяет API метода ``push``.

# Модальные окна
...