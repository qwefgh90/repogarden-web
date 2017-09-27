export class VulnerableResult {
    constructor(readonly vulnerableList: Array<VulnerablePart>, readonly path: String) { }
};

export class VulnerablePart {
    constructor(readonly vulnerableVersionList: Array<string>, readonly javaModule: JavaModule, readonly cve: Cve) { }
};

export class Cve {
    constructor(readonly cve: string, readonly title: string, readonly description: string, readonly references: Array<string>) { }
}

export class JavaModule {
    constructor(readonly groupId: string, readonly artifactId: string, readonly version: Array<string>, readonly fixedin: Array<string>, readonly unaffected: Array<string>) { }
}
