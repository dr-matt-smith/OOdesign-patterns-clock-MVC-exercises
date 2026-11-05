// Subject.ts - the Subject of the Observer pattern: something that keeps a list of observers, and tells them
// all when it changes. It is abstract - it is only used as a superclass, e.g. `class ClockModel extends Subject`.
//
// `this` (as a type) means "whichever subclass this is": in ClockModel, Observer<this> is Observer<ClockModel>.

import type { Observer } from "./Observer.ts";

export abstract class Subject {
  private observers: Observer<this>[] = [];

  addObserver(observer: Observer<this>): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer<this>): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  // protected: subclasses can call it (after they change), but other classes can't
  protected notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this); // pass ourself, so each observer can read our data
    }
  }
}
