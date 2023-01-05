import { Container } from "inversify";
import { App } from "./app";
import { IApp } from "./app.interface";
import { ENGINE_TYPES, MODEL_TYPES, MAIN_TYPES, VIEW_TYPES } from "./types";

import "reflect-metadata";
import { HistoryModel, IHistoryModel } from "./model/data_layer/history.model";
import { ILogger, NullLogger } from "./logger/logger.service";
import { EngineService, IEngineService } from "./engine/engine.service";
import { IStateModel, StateModel } from "./model/data_layer/state.model";
import { BufferModel, IBufferModel } from "./model/data_layer/buffer.model";
import { DataManager, IDataManager } from "./model/data.manager";
import { IScreen, Screen } from "./view/screen.view";
import {
    EngineController,
    IEngineController,
} from "./engine/engine.controller";

const mainContainer = new Container({
    defaultScope: "Singleton",
    skipBaseClassChecks: false,
});

mainContainer
    .bind<IEngineService>(ENGINE_TYPES.EngineService)
    .to(EngineService);
mainContainer
    .bind<IEngineController>(ENGINE_TYPES.EngineController)
    .to(EngineController);

mainContainer.bind<IApp>(MAIN_TYPES.App).to(App);
mainContainer.bind<ILogger>(MAIN_TYPES.Logger).to(NullLogger);

mainContainer.bind<IHistoryModel>(MODEL_TYPES.HistoryModel).to(HistoryModel);
mainContainer.bind<IStateModel>(MODEL_TYPES.StateModel).to(StateModel);
mainContainer.bind<IBufferModel>(MODEL_TYPES.BufferModel).to(BufferModel);
mainContainer.bind<IDataManager>(MODEL_TYPES.DataManager).to(DataManager);

mainContainer.bind<IScreen>(VIEW_TYPES.Screen).to(Screen);

const app = mainContainer.get<IApp>(MAIN_TYPES.App);

app.init();
