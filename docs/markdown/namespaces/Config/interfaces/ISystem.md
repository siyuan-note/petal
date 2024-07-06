[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / ISystem

# Interface: ISystem

System related information

## Properties

### appDir

> **appDir**: `string`

The absolute path of the `resources` directory under the SiYuan installation directory

#### Defined in

[types/config.d.ts:1349](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1349)

---

### autoLaunch2

> **autoLaunch2**: `number`

Boot automatically

- `0`: Do not boot automatically
- `1`: Boot automatically
- `2`: Boot automatically + Minimize UI

#### Defined in

[types/config.d.ts:1356](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1356)

---

### confDir

> **confDir**: `string`

The absolute path of the `conf` directory of the current workspace

#### Defined in

[types/config.d.ts:1360](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1360)

---

### container

> **container**: [`TSystemContainer`](../type-aliases/TSystemContainer.md)

Kernel operating environment

- `docker`: Docker container
- `android`: Android device
- `ios`: iOS device
- `std`: Desktop Electron environment

#### Defined in

[types/config.d.ts:1368](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1368)

---

### dataDir

> **dataDir**: `string`

The absolute path of the `data` directory of the current workspace

#### Defined in

[types/config.d.ts:1372](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1372)

---

### disableGoogleAnalytics

> **disableGoogleAnalytics**: `boolean`

Whether to disable Google Analytics

#### Defined in

[types/config.d.ts:1376](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1376)

---

### downloadInstallPkg

> **downloadInstallPkg**: `boolean`

Whether to automatically download the installation package for the new version

#### Defined in

[types/config.d.ts:1380](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1380)

---

### homeDir

> **homeDir**: `string`

The absolute path of the user's home directory for the current operating system user

#### Defined in

[types/config.d.ts:1384](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1384)

---

### id

> **id**: `string`

The UUID of the current session

#### Defined in

[types/config.d.ts:1388](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1388)

---

### isInsider

> **isInsider**: `boolean`

Whether the current version is an internal test version

#### Defined in

[types/config.d.ts:1392](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1392)

---

### isMicrosoftStore

> **isMicrosoftStore**: `boolean`

Whether the current version is a Microsoft Store version

#### Defined in

[types/config.d.ts:1396](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1396)

---

### kernelVersion

> **kernelVersion**: `string`

Kernel version number

#### Defined in

[types/config.d.ts:1400](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1400)

---

### lockScreenMode

> **lockScreenMode**: `number`

Lock screen mode

- `0`: Manual
- `1`: Manual + Follow the operating system

#### Defined in

[types/config.d.ts:1406](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1406)

---

### name

> **name**: `string`

The name of the current device

#### Defined in

[types/config.d.ts:1410](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1410)

---

### networkProxy

> **networkProxy**: [`INetworkProxy`](INetworkProxy.md)

#### Defined in

[types/config.d.ts:1411](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1411)

---

### networkServe

> **networkServe**: `boolean`

Whether to enable network serve (whether to allow connections from other devices)

#### Defined in

[types/config.d.ts:1415](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1415)

---

### os

> **os**: [`TSystemOS`](../type-aliases/TSystemOS.md)

The operating system name determined at compile time (obtained using the command `go tool dist list`)

- `android`: Android
- `darwin`: macOS
- `ios`: iOS
- `linux`: Linux
- `windows`: Windows

#### Defined in

[types/config.d.ts:1425](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1425)

---

### osPlatform

> **osPlatform**: `string`

Operating system platform name

#### Defined in

[types/config.d.ts:1429](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1429)

---

### uploadErrLog

> **uploadErrLog**: `boolean`

Whether to upload error logs

#### Defined in

[types/config.d.ts:1433](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1433)

---

### workspaceDir

> **workspaceDir**: `string`

The absolute path of the workspace directory

#### Defined in

[types/config.d.ts:1437](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1437)
