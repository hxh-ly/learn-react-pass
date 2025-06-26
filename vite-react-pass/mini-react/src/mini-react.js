(function () {
  function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map((children) => {
          const isTextNode =
            typeof children === "string" || typeof children === "number";
          return isTextNode ? createTextNode(children) : children;
        }),
      },
    };
  }

  function createTextNode(nodeValue) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue,
        children: [],
      },
    };
  }

  let nextUnitOfWork = null;
  let wipRoot = null;
  let currentRoot = null;
  let deletions = null; //要删除的节点
  function render(element, container) {
    wipRoot = {
      dom: container,
      props: {
        children: [element],
      },
      alternate: currentRoot,
    };
    deletions = [];
    nextUnitOfWork = wipRoot;
    console.log('开始reconcile')
  }

  function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      shouldYield = deadline.timeRemaining() < 1;
    }
    if (!nextUnitOfWork && wipRoot) {
      commitRoot();
    }
    requestIdleCallback(workLoop);
  }
  requestIdleCallback(workLoop);

  function performUnitOfWork(fiber) {
    console.log(`每一个fiber开始${fiber.type}`, fiber);
    const isFnComp = fiber.type instanceof Function;
    if (isFnComp) {
      updateFunctionComponent(fiber);
    } else {
      updateHostComponent(fiber);
    }

    if (fiber.child) {
      return fiber.child;
    }
    // 如果往回的，如果叶子节点没有兄弟，往返一直到有兄弟的叶子节点,到都解析完一直返回到wipRoot
    let nextFiber = fiber;
    while (nextFiber) {
      if (nextFiber.sibling) {
        return nextFiber.sibling;
      }
      nextFiber = nextFiber.return;
      // console.log('一直往上的情况',nextFiber)
    }
  }
  let wipFiber = null;
  let stateHookIndex = 0;
  function updateFunctionComponent(fiber) {
    wipFiber = fiber;
    stateHookIndex = 0;
    wipFiber.stateHooks = [];
    wipFiber.effectHooks = [];
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
  }

  function updateHostComponent(fiber) {
    if (!fiber.dom) {
      fiber.dom = createDom(fiber);
    }
    reconcileChildren(fiber, fiber.props.children);
  }
  function createDom(fiber) {
    const dom =
      fiber.type === "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(fiber.type);
    updateDom(dom, {}, fiber.props); // 注入属性方法
    return dom;
  }
  const isEvent = (key) => key.startsWith("on");
  const isProperties = (key) => key !== "children" && !isEvent(key);
  const isNew = (prev, next) => (key) => prev[key] !== next[key];
  const isGone = (prev, next) => (key) => !(key in next);
  function updateDom(dom, prevProps, nextProps) {
    // dom是真实的dom
    //remove old or change eventlistener
    Object.keys(prevProps)
      .filter(isEvent)
      .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
      .forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
      });
    // remove old properties
    Object.keys(prevProps)
      .filter(isProperties)
      .filter(isGone(prevProps, nextProps))
      .forEach((name) => {
        dom[name] = "";
      });
    // add new or change properties
    Object.keys(nextProps)
      .filter(isProperties)
      .filter(isNew(prevProps, nextProps))
      .forEach((name) => {
        dom[name] = nextProps[name];
      });
    // add new Event
    Object.keys(nextProps)
      .filter(isEvent)
      .filter(isNew(prevProps, nextProps))
      .forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, nextProps[name]);
      });
  }

  function reconcileChildren(wipFiber, elements) {
    console.log("开始递归 reconcileChildren", { elements });
    let index = 0;
    let oldFiber = wipFiber.alternate?.child;

    let prevSibling = null;
    while (index < elements.length || oldFiber != null) {
      const element = elements[index];
      const sameType = element?.type == oldFiber?.type;
      let newFiber = null;
      if (sameType) {
        newFiber = {
          type: oldFiber.type,
          props: element.props,
          dom: oldFiber.dom,
          return: wipFiber,
          alternate: oldFiber,
          effectTag: "UPDATE",
        };
      }
      if (element && !sameType) {
        newFiber = {
          type: element.type,
          props: element.props,
          dom: null,
          return: wipFiber,
          alternate: null,
          effectTag: "PLACEMENT",
        };
      }
      if (oldFiber && !sameType) {
        oldFiber.effectTag = "DELETION";
        deletions.push(oldFiber);
      }
      if (oldFiber) {
        oldFiber = oldFiber.sibling;
      }

      if (index == 0) {
        wipFiber.child = newFiber;
      } else if (element) {
        prevSibling.sibling = newFiber;
      }
      prevSibling = newFiber;
      index++;
    }
  }
  function useState(initalState) {
    const currentFiber = wipFiber;
    const oldHook = wipFiber.alternate?.stateHooks[stateHookIndex]; // 2.state的初始值是前面一次渲染的state值，也就是取alternate的同一位置的state
    const stateHook = {
      state: oldHook ? oldHook.state : initalState,
      queue: oldHook ? oldHook.queue : [],
    };
    stateHook.queue.forEach((action) => {
      stateHook.state = action(stateHook.state);
    });
    stateHook.queue = [];
    stateHookIndex++;
    wipFiber.stateHooks.push(stateHook); // 1.每次调用useState时会在stateHooks添加一个元素来保存state
    function setState(action) {
      const isFunction = typeof action === "function";
      stateHook.queue.push(isFunction ? action : () => action);
      wipRoot = {
        ...currentFiber,
        alternate: currentFiber,
      };
      nextUnitOfWork = wipRoot;
    }
    return [stateHook.state, setState];
  }
  function useEffect(callback, deps) {
    const effectHook = {
      callback,
      deps,
      cleanup: undefined,
    };
    wipFiber.effectHooks.push(effectHook);
  }
  function commitRoot() {
    console.log('开始commit')
    deletions.forEach(commitWork);
    commitWork(wipRoot.child);
    commitEffectHooks();
    currentRoot = wipRoot;
    wipRoot = null;
    deletions = [];
  }

  function commitWork(fiber) {
    if (!fiber) {
      return;
    }
    // 找到顶层祖先的fibler，执行操作
    let parentFiber = fiber.return;
    while (!parentFiber.dom) {
      parentFiber = parentFiber.return;
    }
    let domParent = parentFiber.dom;
    if (fiber.effectTag === "PLACEMENT" && fiber.dom !== null) {
      domParent.appendChild(fiber.dom);
    } else if (fiber.effectTag === "UPDATE" && fiber.dom !== null) {
      updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag === "DELETION") {
      commitDeletion(fiber, domParent);
    }
    commitWork(fiber.child);
    commitWork(fiber.sibling);
  }
  function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
      domParent.removeChild(fiber.dom);
    } else {
      commitDeletion(fiber.child, domParent);
    }
  }

  function isDepsEqual(deps, newDeps) {
    if (deps.length !== newDeps.length) {
      return false;
    }

    for (let i = 0; i < deps.length; i++) {
      if (deps[i] !== newDeps[i]) {
        return false;
      }
    }
    return true;
  }
  function commitEffectHooks() {
    function runCleanup(fiber) {
      if (!fiber) {
        return;
      }
      fiber.alternate?.effectHooks?.forEach((hook, index) => {
        const deps = fiber.effectHooks[index];
        if (!hook.deps || isDepsEqual(hook.deps, deps)) {
          hook.cleanup?.();
        }
      });
      runCleanup(fiber.child);
      runCleanup(fiber.sibling);
    }
    function run(fiber) {
      if (!fiber) {
        return;
      }
      fiber.effectHooks?.forEach((newHook, index) => {
        if (!fiber.alternate) {
          newHook.cleanup = newHook.callback();
          return;
        }
        if (!newHook.deps) {
          newHook.cleanup = newHook.callback();
        }
        if (newHook.deps.length > 0) {
          const oldHook = fiber.alternate?.effectHooks[index];
          if (!isDepsEqual(oldHook.deps, newHook.deps)) {
            newHook.cleanup = newHook.callback();
          }
        }
      });
      //遍历现在的effectHooks 没有alternate-执行返回；fiber没有依赖，执行；有依赖对比长度再看
      run(fiber.child);
      run(fiber.sibling);
    }
    runCleanup(wipRoot);
    run(wipRoot);
  }
  const MiniReact = {
    createElement,
    render,
    useState,
    useEffect,
  };
  window.MiniReact = MiniReact;
})();
