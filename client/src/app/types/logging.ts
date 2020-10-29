export function Log() {
    return function(target: Object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
        const method = propertyDescriptor.value;
        propertyDescriptor.value = function(args: unknown[]) {
            const params = args.map(arg => JSON.stringify(arg)).join();
            const result = method.apply(this, args);
            if (args && args.length > 0) {
                console.log(`Calling ${propertyName} with ${params}`);
            } else {
                console.log(`Calling ${propertyName} without parameters`);
            }
            return result;
        };
        return propertyDescriptor;
    };
}